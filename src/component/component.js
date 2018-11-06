/* eslint-disable */

//组建用于集中导出自定义的所有组件 方便在别的组件中批量、多次调用

import Loadable from './common/Loadable';

export Header from './Header';

// export Router1 from './Router1';
// export Router2 from './Router2';


export const Router1 = Loadable({
    loader: () => import('./Router1')
});
export const Router2 = Loadable({
    loader: () => import('./Router2')
});
