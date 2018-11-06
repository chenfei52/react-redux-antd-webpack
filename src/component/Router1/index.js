import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { actions } from './../../redux/action/common';
import style from  './index.scss'

export default @connect(state=>{
    return {
        userInfo: state.global.userInfo
    }
}, dispatch=>{
    return {
        "userAction": ()=> { dispatch(actions.userInfo({name: "陈非"})) }
    }
})
class Router1 extends Component{
    constructor(){
        super();
        console.log(location);
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
Router1.propTypes = {
    userAction: PropTypes.func
};
