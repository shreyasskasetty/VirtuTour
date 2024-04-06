import {combineReducers} from 'redux';
import mapReducer from './mapReducer';
import buttonReducer from './buttonReducer';
import bottomSheetReducer from './bottomSheetReducer';
const rootReducer = combineReducers({
    map: mapReducer,
    bottomSheet: bottomSheetReducer,
    button: buttonReducer,
})

export default rootReducer;