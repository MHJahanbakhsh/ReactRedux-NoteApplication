import { Switch } from "react-router-dom";
import { combineReducers } from "redux";
import {reducer as formReducer} from 'redux-form';
import _  from 'lodash';


const INITIAL_STATE = {
    isSignedIn:null,
    userId:null
}

function authReducer(state=INITIAL_STATE,action){
    switch(action.type){
        case 'SIGN_IN':
            return {...state,isSignedIn:true,userId:action.payload};
        
        case'SIGN_OUT':
            return {...state,isSignedIn:false,userId:action.payload};
        
        default:return state
    }
}


function noteReducer(state={},action){
    switch(action.type){
        case 'EDIT-NOTE':
            return {...state ,[action.payload.id]:action.payload} //this is called key interpolation
        case'CREATE_NOTE':
            return {...state , [action.payload.id]:action.payload}
        case 'FETCH_NOTE':
            return {...state , [action.payload.id]:action.payload}
        case 'FETCH_NOTES':
            return {...state , ..._.mapKeys(action.payload,'id')}
        case 'DELETE_NOTE':
            return _.omit(state,action.payload);//becuase payload is the id itself(look at actions) we dont have to say payload.id
            //also omit does not change previous object.it returns a new one
        default:
            return state
        }

}

/*
//let see how array baseed approach would be(just for 'EDIT_STREAM'case)

function streamReducer(state=[],action){
    switch(action.type){
        case 'EDIT_STREAM':
            return state.map(stream=>{
                if(stream.id===action.payload.id){
                    return action.payload
                }else return stream
            })
    }
    default:
        return state
}
*/

export default combineReducers({
    auth:authReducer,
    form:formReducer,
    note:noteReducer
})

