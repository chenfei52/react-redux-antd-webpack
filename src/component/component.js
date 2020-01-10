/* eslint-disable */

//组建用于集中导出自定义的所有组件 方便在别的组件中批量、多次调用

import React, { lazy } from 'react';

export Header from './Header';
export LeftMenu from './LeftMenu';
export Loading from './common/Loading';


export const Login = lazy(() => import('./Login'));
