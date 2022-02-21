import React from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { fetchNote } from '../../actions';

const NoteShow = (props)=>{

    const {id} = props.match.params

    useEffect(()=>props.fetchNote(id),[])

    function renderedContent(){
        if(props.note){
            return <div className='container card'>
                        <h2 className='card-title'>Title : {props.note.title}</h2>
                        <p className='card-text'>Content : {props.note.description}</p>
                    </div>
        }else return null
    }
    
    return renderedContent()
    
};

function mapStateToProps(state,ownProps){
    console.log(state)
    return {note:state.note[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchNote})(NoteShow)