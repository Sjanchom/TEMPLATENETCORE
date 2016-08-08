import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './store';
import { routerReducer } from 'react-router-redux';


export default function configureStore(initialState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    //const thunk = (thunkModule as any).default; // Workaround for TypeScript not importing thunk module as expected
    const windowIfDefined = typeof window === 'undefined' ? null : window;
    const devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension; // If devTools is installed, connect to it
    
    const enchancer = compose(
        applyMiddleware(reduxThunk)
    );

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(rootReducer);
    const store = createStore(allReducers, initialState,enchancer);

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./store', () => {
            const nextRootReducer = require('./store');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

    function buildRootReducer(allReducers) {
        return combineReducers(Object.assign({}, allReducers, { routing: routerReducer }));
    }
