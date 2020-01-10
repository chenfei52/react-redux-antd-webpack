/* global Victor */
import React, { useState, useContext, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, Icon } from 'antd';
import Req, { apiList } from '@src/util/request';
import { actions } from '@src/redux/actions';
import { globalContext } from "@src/redux/reducer";
import './index.scss';

function Login({ history }){
    const [ data, setData ] = useState({user_name: '', password: ''});
    const { dispatch } = useContext(globalContext);
    const container = useRef(null);

    useEffect(()=>{
        let victor = new Victor("canvasContainer", "canvasContainer2");
    }, []);

    const fieldChange = (e, key) =>{
        setData({
            ...data,
            [key]: e.target ? e.target.value : e
        });
    };
    let login = ()=>{
        Req({
            url: apiList.login,
            type: 'POST',
            data: data
        }, res=>{
            localStorage.setItem("token", res.data && res.data.token);
            dispatch(actions.userInfo(res.data));
            history.push('/admin/activity/list');
        })
    };
    return (
        <div className="login-page">
            <div id="canvasContainer" ><div id="canvasContainer2"> </div></div>
            <div className="container" >
                <div className="login">

                    <h2>后台管理系统模板</h2>
                    <Input onChange={ (e)=>{ fieldChange(e, 'user_name') } }
                           value={ data.user_name || '' }
                           prefix={<Icon type="user" />}
                           onPressEnter={ login }
                           type="text"
                           id="userName"
                           placeholder="请输入账号" />

                    <Input onChange={ (e)=>{ fieldChange(e, 'password') } }
                           value={ data.password || '' }
                           prefix={<Icon type="lock" />}
                           onPressEnter={ login }
                           type="password"
                           placeholder="请输入密码" />

                    <Button type="primary" onClick={ login }>登录</Button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
