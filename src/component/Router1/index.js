import React from 'react';
import TimeClick from "./TimeClick";
import { testBuild } from '@src/util/util';
import { Input } from 'antd';
import styles from './index.module.scss';

export default function Router1(){
    testBuild();
    return (
        <div className={ styles.test }>
            <Input />
            <TimeClick />
        </div>
    )
}
