import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import style from './index.scss'

export default class Header extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={ style.header }>
                这是头部
                <Link to="/router1">路由1</Link>
                <Link to="/router2">路由2</Link>
            </div>
        )
    }
}
