import React from 'react';
import {Field,reduxForm} from 'redux-form' //Field is a component and reduxForm is essentialy a function(equivelant to 'connect()' function back in react-redux)
//we use Field,anytime we wants to have some kind of input(ex:input,checkbox,radio,dropdown...)
//in automating redux behind the scenes stuff for form,Field is essential and is a must have thing

class NoteForm extends React.Component{
    constructor(props){
        super(props);
        this.myOnSubmit = this.myOnSubmit.bind(this)

    }

    toRender(FieldProps){ //Field would pass bunch of form-related props to its component's function.we use them ro make our elements controlled
        // console.log('props created by Fields: ',FieldProps)
    
       return (<div >
            <label className='form-label' htmlFor={FieldProps.id}>{FieldProps.label}</label>
        <input className='form-control' type="text" id={FieldProps.id} {...FieldProps.input} autoComplete='off'/>
        {FieldProps.meta.touched && FieldProps.meta.error?<div className='alert alert-danger' role="alert">{FieldProps.meta.error}</div>:''}
        <br />
        </div>
        )
    }

    myOnSubmit(formValues){        //becuase we passed this function to handleSubmit;handleSubmit would do e.preventDefault() for us automatically
        // console.log(this.props) //and also there is no 'event'object in argument anymore; instead formValues is equalls to whatever we typed in input 
        this.props.onSubmit(formValues)
    }
    
    
    //handleSubmit is speacial prop function added by redux form
    render(){ //component attr in Field is either a react component or a function for Field to call.this func or comp needs to return some element to show on screen
        return <form className='container' onSubmit={this.props.handleSubmit(this.myOnSubmit)}> 
            <Field name='title' component={this.toRender} label='Enter Title' id='field1'/> 
            <Field name='description' component={this.toRender} label='Enter Description' id='field2'/> 
            <button className='btn btn-primary btn-lg'>Submit</button>
        </form> 
    }//whenever we pass a prop to Field component that its has no idea what to do with,it'll pass this to 'component' attr as props which itself is a funcction or component 

    // componentDidMount(){
    //     console.log('props created by reduxForm: ',this.props)
    // }

}

/*what essentially happens with validating redux form is:it looks at errors obj keys,in this case 'title' and 'description' and add the 
values of them to the respective Field with the same name;on 'FieldProps.meta.error'  */
function validate(formValues){
    const errors = {}; //this object will return as "Fieldprops.meta.error" name of this object has to be "errors".the important thing is the keys of object should be equal to Field names 

    if(!formValues.title){
        errors.title = 'you must enter a title' 
    }
    if(!formValues.description){
        errors.description = 'you must write some description'
    }
    return errors
}

//unlike connect() reduxForm takes only one argument(an object)
/*becuase reduxForm does all the bts work for us,after wiring it to your
component ,by default it will pass tremendous number of props*/
const formWrapped =  reduxForm({
    form:'noteForm',
    validate:validate //this is how we wireup our validation .validate is speacial key.ALSO there is another way of validation which each Field has its own specific typeof validation this way called:Field-Level Validation  
})(NoteForm)

export default formWrapped //in the case of code re-using streamForm 
//does not need to call any action creator.its up to parent component.so we dont need connect function at all!