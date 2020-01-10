import React, { useContext, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { globalContext } from "@src/redux/reducer";
import { Icon } from 'antd';
import './index.scss'

function Header({ history }){
    const { global={}, router={} } = useContext(globalContext);
    const { userInfo } = global;
    const loginOut = useCallback(()=>{
        localStorage.removeItem("token");
        history.push("/");
    }, []);
    return (
        <div className="header">
            {
                userInfo ?
                    <div className="user">
                        <Icon type="user" />
                        <span>{ userInfo && userInfo.name }</span>
                        <Icon title="退出" onClick={ loginOut } type="logout" />
                    </div>
                    : null
            }
        </div>
    )
}

export default withRouter(Header)
