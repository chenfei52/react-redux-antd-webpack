import React, { Component } from 'react';
import style from './index.scss'

export default class Header extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className={ style.header }>
                这是头部
            </div>
        )
    }
}