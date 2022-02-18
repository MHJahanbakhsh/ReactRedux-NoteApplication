import React from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware , compose} from 'redux';
import App from './components/App';
import reducers from './reducers';
import reduxThunk from 'redux-thunk'


//for redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(reduxThunk)))
reactDom.render(
    <Provider store = {store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);