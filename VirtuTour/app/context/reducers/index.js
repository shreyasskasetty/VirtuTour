import {combineReducers} from 'redux';
import routeReducer from './routeReducer';
import buttonReducer from './buttonReducer';

const rootReducer = combineReducers({
    routeSelector: routeReducer,
    tourTypeSelector: buttonReducer,
})

export default rootReducer;