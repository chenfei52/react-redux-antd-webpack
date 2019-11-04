import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { globalContext } from "@src/redux/reducer";
import style from './index.scss'

export default function Header() {
    const { state } = useContext(globalContext);
    return (
        <div className={style.header}>
            这是头部, 用户名为{state.userInfo && state.userInfo.name}
            <Link to="/router1">路由1</Link>
            <Link to="/router2">路由2</Link>
        </div>
    )
}
