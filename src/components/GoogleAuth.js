import React from 'react';
import {FaGoogle} from 'react-icons/fa';
import {connect} from 'react-redux';
import { signIn,signOut } from '../actions';

class GoogleAuth extends React.Component{
    constructor(props){
        super(props)
        this.onsignInClick = this.onsignInClick.bind(this);
        this.onsignOutClick = this.onsignOutClick.bind(this); //binds should come in constructor
    }


    componentDidMount(){
        // console.log('props: ',this.props)
        window.gapi.load('client:auth2',()=>{
           window.gapi.client.init({
                clientId:'410916988914-l2sseql9jsjkv4nvleauphg9vfprcigu.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange) //by default the function inside listen method will get a boolean argument
                                                                //which tells the current status of signing(true or false).so we dont actually need to
            })                                                  //reach in to this.auth.isSignedIn.get() for getting that 
        })

    }

    onAuthChange = (isSignedIn)=>{//since we are going to use this as a callback in another function its better to use arrow functions or 'this' will screw us
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        }else{
            this.props.signOut()
        }
    }

    thingsToRender(){ //you see to define a regular function in a class you dont need a 'function' keyword
        if(this.props.isSignedIn===true){
            return <button className="btn btn-danger" onClick={this.onsignInClick}>sign out <FaGoogle/></button>
        }else if(this.props.isSignedIn===false){
            return <button className="btn btn-danger" onClick={this.onsignOutClick}>please sign in <FaGoogle/></button>
        }else return null
    }

    

    onsignInClick(){
        this.auth.signOut()

    }
    onsignOutClick(){
        this.auth.signIn()

    }


    render(){
        return <> {this.thingsToRender()}</>
                
    }
}

function mapStateToProps(state){
    // console.log(state)
    return{isSignedIn:state.auth.isSignedIn}
}


export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth)