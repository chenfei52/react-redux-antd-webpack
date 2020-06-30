import React from 'react';
import TimeClick from "./TimeClick";
import styles from './index.module.scss';

export default function Router1(){
    let a = {tt:8};
    let b = a?.f?.tt;
    console.log(b);
    console.log('1111111');
    return (
        <div className={ styles.test }>
            <TimeClick />
        </div>
    )
}
