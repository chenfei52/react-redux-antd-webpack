/* eslint-disable */
import React, { useEffect, useContext } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Header, Router1, Router2 } from './component';
import { globalContext } from "@src/redux/reducer";
import useUserInfoApi from "@src/api/useUserInfoApi";
import styles from './../style/style.scss';

export default function Root() {
    const { state, dispatch } = useContext(globalContext);
    const { userInfo, getUserInfo } = useUserInfoApi();
    useEffect(()=>{
        dispatch({
            type: "USERINFO",
            data: {
                name: "test"
            }
        });
    }, []);
    return (
        <HashRouter>
            <div>
                <Header/>

                {
                    <div className={styles.content}>
                        <Route path="/" exact component={Router1}/>
                        <Route path="/router1" component={Router1}/>
                        <Route path="/router2" exact component={Router2}/>
                        <Route path={["/router2/:id", "/router3/:id"]} component={Router2}/>
                    </div>
                }
            </div>
        </HashRouter>
    )
}
