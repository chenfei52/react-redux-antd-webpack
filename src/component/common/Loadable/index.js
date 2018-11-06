/* eslint-disable */

// 这个组件用于处理按照路由按需加载js 主要运用了import()按需加载
import React, { Component } from 'react';
import Loading from "../Loading";

//处理loading组件和路由组件显示
class Package extends Component{
    state = {
        Component: null
    };
    componentDidMount(){
        this.props.loader && this.props.loader().then(({ default: Component })=>{
            this.setState({
                Component
            })
        }).catch(error=>{
            console.log(error);
        });
    }
    render(){
        const { Component } = this.state;
        if(Component){
            return <Component />;
        }else{
            return <Loading />;
        }
    }
}

/**
 * 加载函数 返回一个函数式组件
 * @param par  eg: {
        loader: () => import('./Router1'),  //动态加载的路由组件
        loading: Loading    //加载组件
    }
 * @returns {function(*): *}
 * @constructor
 */
const Loadable = par => props=> <Package { ...par } />;
export default Loadable;

