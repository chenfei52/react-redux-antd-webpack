import React, {useState} from 'react';
import {Input} from 'antd';
import {useSelector} from 'react-redux';
import {createSelector} from 'reselect';
import styles from './index.module.scss';

const getList = createSelector(
    [
        state => state?.global?.list,
        (_, number) => number
    ],
    (list, number) => list.filter(item => item >= number)
)

export default function Router1() {
    console.log('router1 渲染');
    const [number, setNumber] = useState(0);

    const list = useSelector(state => getList(state, number));


    return (
        <div className={styles.test}>
            <Input onChange={e => setNumber(Number(e.target.value) || 0)}/>
            {list.join(',')}1
        </div>
    )
}
