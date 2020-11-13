import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import globalReducer from './globalReducer';

export default function initStore(){
    const reducer = combineReducers({
        global: globalReducer
    });

    return createStore(reducer, applyMiddleware(thunk))
}