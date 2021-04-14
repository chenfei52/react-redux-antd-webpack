import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import globalReducer from './globalReducer';
import dataReducer from './dataReducer';

export default function initStore(){
    const reducer = combineReducers({
        globalStatus: globalReducer,
        serverData: dataReducer
    });

    return createStore(reducer, applyMiddleware(thunk))
}