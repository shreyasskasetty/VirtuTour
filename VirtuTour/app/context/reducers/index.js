import {combineReducers} from 'redux';
import mapReducer from './mapReducer';
import buttonReducer from './buttonReducer';
import bottomSheetReducer from './bottomSheetReducer';
import audioReducer from './audioReducer';

const rootReducer = combineReducers({
    map: mapReducer,
    bottomSheet: bottomSheetReducer,
    button: buttonReducer,
    audio: audioReducer
})

export default rootReducer;