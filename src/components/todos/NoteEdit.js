//-------------------PRE CODE REUSE------------------------

// import React from 'react';
// import {connect} from 'react-redux';
// import { fetchnote , editnote } from '../../actions';

// class noteEdit extends React.Component{

//     componentDidMount(){
//         this.props.fetchnote(this.props.match.params.id);
//         console.log(this.props)
//     }

//     render(){
//         return <div>note Edit</div>
//     }
// }

// function mapStateToProps(state,ownProps){ 
//     /*this is one of the rare cases that part of our data is on state and another part in props
//     and we need that part in props to access correctly that part in state
//      */
//     return {note:state.note[ownProps.match.params.id]}
// }

// export default connect(mapStateToProps,{fetchnote})(noteEdit);


// -----------------AFTER CODE REUSE--------------------


import React from 'react';
import {connect} from 'react-redux';
import { fetchNote , editNote } from '../../actions';
import NoteForm from './NoteForm'

class NoteEdit extends React.Component{

    componentDidMount(){
        this.props.fetchNote(this.props.match.params.id)

    }

    editOnSubmit = (formValues)=>{
        this.props.editNote(this.props.match.params.id,formValues)
    }


    

    render(){
        if(this.props.note){ //very IMPORTANT note: dont try use conditional for initial values.it wont work.we have to make our 
            //whole return statement to wait for fetchnote response and updating the props afterward.if you do something like this: initialValues = {{}?felan:null} wont work
        // console.log('props: ',this.props)
        return(
        <>
            <h3 className='container'>Edit Note</h3>
            <NoteForm onSubmit={this.editOnSubmit} initialValues={{title:this.props.note.title,description:this.props.note.description}}/>
        </>)
    }
    return <div>loading</div>}
}

function mapStateToProps(state,ownProps){ 
    // console.log('state: ',state)
    /*this is one of the rare cases that part of our data is on state and another part in props
    and we need that part in props to access correctly that part in state
     */
    return {note:state.note[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchNote,editNote})(NoteEdit);