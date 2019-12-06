import React from 'react';
import { withRouter } from "react-router-dom";
import useUserInfoApi from "@src/api/useUserInfoApi";
import './index.scss';

function Router2(){
    const { userInfo, getUserInfo } = useUserInfoApi();
    return (
        <div className="color" >
            此处设置的用户名为：{ userInfo && userInfo.name }
            <button onClick={ getUserInfo }>修改用户名</button>
        </div>
    )
}
export default withRouter(Router2);
