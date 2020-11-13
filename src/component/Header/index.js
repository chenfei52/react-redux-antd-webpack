import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import style from './index.scss'

export default function Header() {
    const { isLoading } = useSelector(state=>state.global);
    const dispatch = useDispatch();
    console.log('header 渲染');
    return (
        <div className={style.header}>
            这是头部, 用户名为
            <Link to="/router1">路由1</Link>
            <Link to="/router2">路由2</Link>
            {
                isLoading ? "正在加载" : <button onClick={ ()=>dispatch({
                    type: "UPDATE_LOADING",
                    data: true
                }) }>加载</button>
            }
        </div>
    )
}
