import React from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { fetchStream } from '../../actions';

const StreamShow = (props)=>{

    const {id} = props.match.params

    useEffect(()=>props.fetchStream(id),[])

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

export default connect(mapStateToProps,{fetchStream})(StreamShow)