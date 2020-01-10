import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { globalContext } from "@src/redux/reducer";
import  './index.scss'

const { SubMenu, Item } = Menu;

function LeftMenu({ history }){
    const [selectedKey, setSelect] = useState(null); //选中左侧菜单
    const { state } = useContext(globalContext);
    const [pathName, setPathName] = useState(history.location.pathname);
    if(history.location.pathname !== pathName){
        setPathName(history.location.pathname)
    }

    useEffect(()=>{
        let keys = ['/admin/1/1']; //当前路由若包含这些字符串 需要设置为选中路由
        let key = false;
        for(let i in keys){
            if(pathName.includes(keys[i])){
                setSelect(keys[i]);
                key = true;
                break;
            }
        }
        if(!key) setSelect(pathName);
    }, [pathName]);

    return (
        <div className="left-menu">
            <div>
                <div className="logo-title">
                    后台管理系统模板<br/>
                    Event Management System
                </div>
                <Menu
                    style={{ width: '100%' }}
                    defaultOpenKeys={['package', 'message']}
                    mode="inline"
                    theme="dark"
                    selectedKeys={[ selectedKey ]}
                >
                    <Item key="/admin/1/1">
                        <NavLink to="/admin/1/1" activeClassName="active">
                            <Icon type="trophy" />菜单1
                        </NavLink>
                    </Item>
                    <SubMenu key="package" title={<span><i className="icon iconfont icon-ticket"> </i><span>菜单2</span></span>}>
                        <Item key={ `/admin/2/2` }><Link to={ `/admin/2/2` }>菜单3</Link></Item>
                        <Item key={ `/admin/3/3` }><Link to={ `/admin/3/3` }>菜单4</Link></Item>
                    </SubMenu>
                    <SubMenu key="message" title={<span><i className="icon iconfont icon-iconfontzhizuobiaozhun023110"> </i><span>菜单5</span></span>}>
                        <Item key={ `/admin/4/4` }><Link to={ `/admin/4/4` }>菜单6</Link></Item>
                    </SubMenu>
                </Menu>
            </div>
        </div>
    )
}

export default withRouter(LeftMenu)
