import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect'
import './index.scss'

const filterByOtherDep = createSelector(
    [
        state => state?.globalStatus?.hideTopMenu,
        (_, dep) => dep,
        (_, dep,dep2) => dep2,
    ],
    (hideTopMenu, dep, dep2) => {  return dep2 ? hideTopMenu : !hideTopMenu; }
)

export default function Header() {
    const { hideTopMenu } = useSelector(state=>{ return state.globalStatus });
    // const hideTopMenu = useSelector(state=>filterByOtherDep(state, 1, 2));
    const dispatch = useDispatch();

    const { isLoading } = global;

    return (
        <div className="header">
            这是头部, 用户名为
            <Link to="/router1">路由1</Link>
            <Link to="/router2">路由2</Link>
            {
                hideTopMenu ? '隐藏' : '显示'
            }
            {/*<button onClick={ ()=>dispatch({*/}
            {/*    type: "HIDE_TOP_MENU",*/}
            {/*    data: !hideTopMenu*/}
            {/*}) }>加载</button>*/}
            <button onClick={ ()=>dispatch({
                type: "HIDE_TOP_MENU",
                data: !hideTopMenu
            }) }>加载</button>
        </div>
    )
}
