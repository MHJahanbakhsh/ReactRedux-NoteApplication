import React from 'react';
import { fetchNotes } from '../../actions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class NoteList extends React.Component{
    componentDidMount(){
        this.props.fetchNotes() //its really important that we call this action from props.not directly.becuase otherwise it wont dispatcch automatically by connect()
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
      return  Object.values(this.props.notes).map((note)=>{
            return(<div key={note.id}>
                {note.userId === this.props.currentUserId && note.userId? //i puted &&note.userId cause in case of signed-out;both note.userId and props.currentUserId are undefined and === will returns true and render buttons on items with no userId!
                <li className="list-group-item"  style={this.style}>
                    <div className='contents'>
                        <h3><Link to={`todo/${note.id}`}>{note.title}</Link></h3>
                        <p className='notes-desc'>{this.add3Dots(note.description,200)}</p>
                        {note.description.length>200? <Link to={`todo/${note.id}`} >read more</Link>:null}
                     </div>
                            <div className='buttons'>
                                <Link to={`/todo/edit/${note.id}`} className='btn btn-primary'>Edit</Link>
                                <Link to={`/todo/delete/${note.id}`}  className='btn btn-danger'>Delete</Link>
                            </div>
                    </li>:null}</div>)
        })
    }

    notSignedInMessage(){
        return(
        <div style={{textAlign:'center'}} >
        <h1>welcome to my note application</h1>
        <h3>you must sign in via your google account to be able to add and view your notes</h3>
        </div>)
    }

    signedInButNoNotes(){
        let notewithThisUSer = false
        if(this.props.isSignedIn){
            for(let i of Object.values(this.props.notes)){
                if(i.userId === this.props.currentUserId){
                   notewithThisUSer = true
                }
            }
            if (!notewithThisUSer){
                return <h3>not note has been added yet</h3>
            }
            
        }
        return null
    }

    render(){
        return (
            <div className='container'>
                <h1>Notes:</h1>
                <ul className="list-group">
                    {!this.props.isSignedIn? this.notSignedInMessage():null}
                    {this.signedInButNoNotes()}
                    {this.renderedList()}
                </ul>
                <br />
                {this.props.isSignedIn ? <Link to='/todo/new' className='btn btn-primary btn-lg' style={{float:'right'}}>Create Note</Link>:null}
            </div>
        )
    }
}

function mapStateToProps(state){
// console.log('state: ',state)
return {
    notes:state.note,
    currentUserId:state.auth.userId,
    isSignedIn:state.auth.isSignedIn //we could use userId instead of isSignedIn because when user is not signed in,the userId is undefined but isSignedIn is more declarative and its sole purpose is to define the user is signed in or not.so we use that
    }
}

export default connect(mapStateToProps,{fetchNotes})(NoteList)