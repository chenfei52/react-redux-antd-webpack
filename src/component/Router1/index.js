import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from './../../redux/action/common';
import style from  './index.scss'

@connect(state=>{
    return {
        userInfo: state.global.userInfo
    }
}, dispatch=>{
    return {
        userAction: ()=> { dispatch(actions.userInfo({name: "陈非"})) }
    }
})
export default class Router1 extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        this.props.userAction();
    }
    render(){
        return (
            <div className={ style.test }>
                路由11
            </div>
        )
    }
}
