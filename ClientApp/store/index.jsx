import { combineReducers } from 'redux';
import randomReducer from './random_reducer';

const rootReducer = combineReducers({
    auth: randomReducer
});

export default rootReducer;
