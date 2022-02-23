import React , {Suspense} from 'react';
import { BrowserRouter , Route ,Router ,Switch} from 'react-router-dom'; //BrowserRouter is mostly for Before creating our custom history objects and has no use anymore
import NoteList from './todos/NoteList';
import Header from './Header';
import history from '../history';
import {Spinner} from 'react-bootstrap'



const NoteCreate = React.lazy(()=>import('./todos/NoteCreate'))
const NoteShow = React.lazy(()=>import('./todos/NoteShow'))
const NoteEdit = React.lazy(()=>import('./todos/NoteEdit'))
const NoteDelete = React.lazy(()=>import('./todos/NoteDelete'))


//to be honest we are tricking users by react router.with this kind of navigation we are actually showing and hiding 
// diffrent components

/*using <a href='route'></a> tag is a bad aproach for navigating through routes
becuase with anchor tag browser will dump old html and all states  */

const App = ()=>{
    return <div className='app'>
        
        <Router history={history}>
            <Header/>
            <Switch>
                <Suspense fallback={<h1 className='text-center'><Spinner animation="border" size='bg'/></h1>}>

                    <Route path='/' exact component={NoteList}/>  {/*becuase in above ;we pass these components,each component has some default props provided by reacr router;like:history,location,match.. */}
                    <Route path='/todo/new'  component={NoteCreate}/>
                    <Route path='/todo/edit/:id'  component={NoteEdit}/>{/*special charachter is ":" and we could say anything instead of id .whatever we say will be the key of the match params in props for that component*/}
                    <Route path='/todo/delete/:id'  component={NoteDelete}/>
                    <Route path='/todo/:id'  component={NoteShow}/>

                </Suspense>
            </Switch>
        </Router>
    </div>
};

export default App;