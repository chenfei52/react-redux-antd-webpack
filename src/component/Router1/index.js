import React from 'react';
import TimeClick from "./TimeClick";
import styles from './index.module.scss';

console.log(styles);

export default function Router1(){
    return (
        <div className={ styles.test }>
            路由11
            <span className="blue">蓝色</span>
            <TimeClick />
        </div>
    )
}
