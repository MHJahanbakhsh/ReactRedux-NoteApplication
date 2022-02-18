import streams from "./todos";
import history from "../history";

export function signIn(userId){
    return {
        type:'SIGN_IN',
        payload:userId
    }
}

export function signOut(){
    return {
        type:'SIGN_OUT'
    }
}

export function createStream(formValues){
    return async function(dispatch,getState){
        const {userId} = getState().auth
       const response = await streams.post('/todos',{...formValues,userId});

       dispatch({type:'CREATE_STREAM',payload:response.data}) //with axios response object contains lots of info that we dont need.the real data is on data attribute
        //after we got our response we want to do some progromatic navigation
        history.push('/')
    }
}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/todos');
    console.log(response.data)
    dispatch({ type: 'FETCH_STREAMS', payload: response.data });
    
  };

export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/todos/${id}`);
  
    dispatch({ type: 'FETCH_STREAM', payload: response.data });
  };


export function editStream(id,formValues){
    return async function(dispatch){
        const response = await streams.patch(`/todos/${id}`,formValues);

        dispatch({type:'EDIT_STREAM',payload:response.data})
        history.push('/')
    }

}

export function deleteStream(id){
    return async function(dispatch){
        await streams.delete(`/todos/${id}`) //there is no response
        
        dispatch({type:'DELETE_STREAM',payload:id})
        history.push('/')
    }
}