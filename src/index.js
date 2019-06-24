/**
 * Created by chenfei on 2018/2/5.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Root from './component/Root';
import {ContextProvider} from "@src/redux/reducer";

let container = document.getElementById('container');
let node = <ContextProvider><Root /></ContextProvider>;



ReactDom.render(node, container);
