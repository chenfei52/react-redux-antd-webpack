import { createStore, combineReducers } from 'redux';
import { global } from './reducer/global';

export default function initRedux(){
    const reducer = combineReducers({
        global
    });
    const store = createStore(reducer);
    return store;
}
