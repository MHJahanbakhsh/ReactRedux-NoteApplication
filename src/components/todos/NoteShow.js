import React from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { fetchNote } from '../../actions';

const NoteShow = (props)=>{

    const {id} = props.match.params

    useEffect(()=>props.fetchNote(id),[])

    function renderedContent(){
        if(props.stream){
            return <div>
                        <h2>Title : {props.stream.title}</h2>
                        <p>Content : {props.stream.description}</p>
                    </div>
        }else return null
    }
    
    return renderedContent()
    
};

function mapStateToProps(state,ownProps){
    console.log(state)
    return {stream:state.stream[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchNote})(NoteShow)