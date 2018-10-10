//组建用于集中导出自定义的所有组件 方便在别的组件中批量、多次调用
import Loadable from './common/Loadable';
import Loading from './common/Loading';


export Header from './Header';

export const Router1 = Loadable({
    loader: () => import('./Router1'),
    loading: Loading
});
export const Router2 = Loadable({
    loader: () => import('./Router2'),
    loading: Loading
});
