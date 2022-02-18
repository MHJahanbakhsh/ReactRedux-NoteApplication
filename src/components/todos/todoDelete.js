import React from 'react';
import MyModal from '../Modal';
import { useEffect } from 'react';
import { fetchStream , deleteStream } from '../../actions';
import { connect } from 'react-redux';

const StreamDelete= (props)=>{
    useEffect(myFunc,[])
    const {id} =props.match.params

    function myFunc(){
        props.fetchStream(id)
    }


    return <MyModal
        title='Delete Stream'
        content={`do you want to delete stream with id ${id}`}
        onDeleteClick={()=>props.deleteStream(id)}/>
}

export default connect(null,{fetchStream,deleteStream})(StreamDelete)