import React from 'react';
import MyModal from '../Modal';
import { useEffect } from 'react';
import { fetchNote , deleteNote } from '../../actions';
import { connect } from 'react-redux';

const NoteDelete= (props)=>{
    useEffect(myFunc,[])
    const {id} =props.match.params

    function myFunc(){
        props.fetchNote(id)
    }


    return <MyModal
        title='Delete Note'
        content={`do you want to delete Note with id ${id}`}
        onDeleteClick={()=>props.deleteNote(id)}/>
}

export default connect(null,{fetchNote,deleteNote})(NoteDelete)