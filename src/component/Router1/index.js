import React, {useState} from 'react';
import {Input, Button} from 'antd';
import styles from './index.module.scss';

export default function Router1() {
    const [number, setNumber] = useState(0);

    return (
        <div className={styles.test}>
            <Input onChange={e => setNumber(Number(e.target.value) || 0)}/>
        </div>
    )
}
