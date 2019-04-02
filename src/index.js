/**
 * Created by chenfei on 2018/2/5.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Root from './component/Root';

let container = document.getElementById('container');
let node = <Root />;



ReactDom.render(node, container);
