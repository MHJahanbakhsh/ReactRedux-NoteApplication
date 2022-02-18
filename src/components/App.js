import React from 'react';
import { BrowserRouter , Route ,Router ,Switch} from 'react-router-dom'; //BrowserRouter is mostly for Before creating our custom history objects and has no use anymore
import streamCreate from './todos/todoCreate';
import streamEdit from './todos/todoEdit';
import StreamDelete from './todos/todoDelete';
import streamList from './todos/todoList';
import streamShow from './todos/todoShow';
import Header from './Header';
import history from '../history';



//to be honest we are tricking users by react router.with this kind of navigation we are actually showing and hiding 
// diffrent components

/*using <a href='route'></a> tag is a bad aproach for navigating through routes
becuase with anchor tag browser will dump old html and all states  */

const App = ()=>{
    return <div className='container'>
        
        <Router history={history}>
            <Header/>
            <Switch>
                <Route path='/' exact component={streamList}/>  {/*becuase in above ;we pass these components,each component has some default props provided by reacr router;like:history,location,match.. */}
                <Route path='/todo/new'  component={streamCreate}/>
                <Route path='/todo/edit/:id'  component={streamEdit}/>{/*special charachter is ":" and we could say anything instead of id .whatever we say will be the key of the match params in props for that component*/}
                <Route path='/todo/delete/:id'  component={StreamDelete}/>
                <Route path='/todo/:id'  component={streamShow}/>
            </Switch>
        </Router>
    </div>
};

export default App;