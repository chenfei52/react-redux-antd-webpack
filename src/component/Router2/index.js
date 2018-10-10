import React, { Component } from 'react';
import style from './index.scss'

export default class Router2 extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className={ style.class }>
                路由2
            </div>
        )
    }
}
