/* eslint-disable */

//组建用于集中导出自定义的所有组件 方便在别的组件中批量、多次调用

import React, { lazy } from 'react';

export Header from './Header';
export Loading from './common/Loading';


export const Router1 = lazy(() => import('./Router1'));
export const Router2 = lazy(() => import('./Router2'));
