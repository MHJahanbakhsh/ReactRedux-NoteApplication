import notes from "./notes";
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

export function createNote(formValues){
    return async function(dispatch,getState){
        const {userId} = getState().auth
       const response = await notes.post('/todos',{...formValues,userId});

       dispatch({type:'CREATE_NOTE',payload:response.data}) //with axios response object contains lots of info that we dont need.the real data is on data attribute
        //after we got our response we want to do some progromatic navigation
        history.push('/')
    }
}

export const fetchNotes = () => async dispatch => {
    const response = await notes.get('/todos');
    // console.log(response.data)
    dispatch({ type: 'FETCH_NOTES', payload: response.data });
    
  };

export const fetchNote = id => async dispatch => {
    const response = await notes.get(`/todos/${id}`);
  
    dispatch({ type: 'FETCH_NOTE', payload: response.data });
  };


export function editNote(id,formValues){
    return async function(dispatch){
        const response = await notes.patch(`/todos/${id}`,formValues);

        dispatch({type:'EDIT_NOTE',payload:response.data})
        history.push('/')
    }

}

export function deleteNote(id){
    return async function(dispatch){
        await notes.delete(`/todos/${id}`) //there is no response
        
        dispatch({type:'DELETE_NOTE',payload:id})
        history.push('/')
    }
}