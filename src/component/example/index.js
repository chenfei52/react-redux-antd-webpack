// 本组件为react基础模板
import React, { Component } from 'react';
import style from './index.scss'

export default class example extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className={ style.class }> </div>
        )
    }
}