/**
 * Created by chenfei on 2018/2/5.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Root from './component/Root';
import {Provider} from 'react-redux';
import initStore from '@src/redux/initStore';


const store = initStore();

let container = document.getElementById('container');
let node = <Provider store={ store }><Root /></Provider>;

ReactDom.render(node, container);