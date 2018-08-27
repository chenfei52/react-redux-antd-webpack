/**
 * Created by chenfei on 2018/2/5.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Root from './component/Root'
import initRedux from "./redux/initRedux";

const store = initRedux();
//监听state变化
store.subscribe(()=>
    console.log(store.getState())
);

let container = document.getElementById('container');
let node = <Root store={ store } />;



ReactDom.render(node, container);