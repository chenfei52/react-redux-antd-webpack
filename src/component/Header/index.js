import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './index.scss'

export default class Header extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={ style.header }>
                这是头部
            </div>
        )
    }
}