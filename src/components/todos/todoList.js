import React from 'react';
import { fetchStreams } from '../../actions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class streamList extends React.Component{
    componentDidMount(){
        this.props.fetchStreams() //its really important that we call this action from props.not directly.becuase otherwise it wont dispatcch automatically by connect()
    }

    style = {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    }

    
    add3Dots(string, limit){
        var dots = " ...";
    if(string.length > limit)
    {
    string = string.substring(0,limit) + dots;
    }

    return string
    }


    renderedList(){
      return  Object.values(this.props.streams).map((stream)=>{
            return(<div>
                {stream.userId === this.props.currentUserId && stream.userId? //i puted &&stream.userId cause in case of signed-out;both stream.userId and props.currentUserId are undefined and === will returns true and render buttons on items with no userId!

                <li className="list-group-item" key={stream.id} style={this.style}>
                    <div className='contents'>
                        <h3><Link to={`todo/${stream.id}`}>{stream.title}</Link></h3>
                        <p className='notes-desc'>{this.add3Dots(stream.description,200)}</p>
                        {stream.description.length>200? <Link to={`todo/${stream.id}`} >read more</Link>:null}
                     </div>
                            <div className='buttons'>
                                <Link to={`/todo/edit/${stream.id}`} className='btn btn-primary'>edit</Link>
                                <Link to={`/todo/delete/${stream.id}`}  className='btn btn-danger'>delete</Link>
                            </div>
                    </li>:null}</div>)
        })
    }

    render(){
        return (
            <div>
                <h1>Notes:</h1>
                <ul className="list-group">
                    {this.renderedList()}
                </ul>
                <br />
                {this.props.isSignedIn ? <Link to='/todo/new' className='btn btn-primary btn-lg' style={{float:'right'}}>Create Note</Link>:null}
            </div>
        )
    }
}

function mapStateToProps(state){
console.log('state: ',state)
return {
    streams:state.stream,
    currentUserId:state.auth.userId,
    isSignedIn:state.auth.isSignedIn //we could use userId instead of isSignedIn because when user is not signed in,the userId is undefined but isSignedIn is more declarative and its sole purpose is to define the user is signed in or not.so we use that
    }
}

export default connect(mapStateToProps,{fetchStreams})(streamList)