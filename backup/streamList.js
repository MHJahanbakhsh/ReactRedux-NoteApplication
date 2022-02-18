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

    renderedList(){
      return  Object.values(this.props.streams).map((stream)=>{
            return(<li className="list-group-item" key={stream.id} style={this.style}>
                    <div className='contents'>
                        <h3>{stream.title}</h3>
                        <p className=''>{stream.description}</p>
                     </div>
                        {stream.userId === this.props.currentUserId && stream.userId? //i puted &&stream.userId cause in case of signed-out;both stream.userId and props.currentUserId are undefined and === will returns true and render buttons on items with no userId!
                            <div className='buttons'>
                                <Link to={`/streams/edit/${stream.id}`} className='btn btn-primary'>edit</Link>
                                <Link to={`/streams/delete/${stream.id}`}  className='btn btn-danger'>delete</Link>
                            </div>:null}
                    </li>)
        })
    }

    render(){
        console.log(this.props.streams)
        return (
            <div>
                <h1>streams:</h1>
                <ul className="list-group">
                    {this.renderedList()}
                </ul>
                {this.props.isSignedIn ? <Link to='/streams/new' className='btn btn-primary btn-lg' style={{float:'right'}}>Create stream</Link>:null}
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