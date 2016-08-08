import './css/site.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './configureStore';
import { syncHistoryWithStore } from 'react-router-redux';





const initialState = window.initialReduxState;
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history } children={ routes } />
    </Provider>,
document.getElementById('react-app')
);