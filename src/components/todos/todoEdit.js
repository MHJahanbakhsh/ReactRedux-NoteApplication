//-------------------PRE CODE REUSE------------------------

// import React from 'react';
// import {connect} from 'react-redux';
// import { fetchStream , editStream } from '../../actions';

// class streamEdit extends React.Component{

//     componentDidMount(){
//         this.props.fetchStream(this.props.match.params.id);
//         console.log(this.props)
//     }

//     render(){
//         return <div>stream Edit</div>
//     }
// }

// function mapStateToProps(state,ownProps){ 
//     /*this is one of the rare cases that part of our data is on state and another part in props
//     and we need that part in props to access correctly that part in state
//      */
//     return {stream:state.stream[ownProps.match.params.id]}
// }

// export default connect(mapStateToProps,{fetchStream})(streamEdit);


// -----------------AFTER CODE REUSE--------------------


import React from 'react';
import {connect} from 'react-redux';
import { fetchStream , editStream } from '../../actions';
import StreamForm from './todoForm'

class streamEdit extends React.Component{

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)

    }

    editOnSubmit = (formValues)=>{
        this.props.editStream(this.props.match.params.id,formValues)
    }


    

    render(){
        if(this.props.stream){ //very IMPORTANT note: dont try use conditional for initial values.it wont work.we have to make our 
            //whole return statement to wait for fetchStream response and updating the props afterward.if you do something like this: initialValues = {{}?felan:null} wont work
        // console.log('props: ',this.props)
        return(
        <>
            <h3>Edit Stream</h3>
            <StreamForm onSubmit={this.editOnSubmit} initialValues={{title:this.props.stream.title,description:this.props.stream.description}}/>
        </>)
    }
    return <div>loading</div>}
}

function mapStateToProps(state,ownProps){ 
    // console.log('state: ',state)
    /*this is one of the rare cases that part of our data is on state and another part in props
    and we need that part in props to access correctly that part in state
     */
    return {stream:state.stream[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchStream,editStream})(streamEdit);