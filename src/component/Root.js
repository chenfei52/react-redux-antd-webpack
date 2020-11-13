/* eslint-disable */
import React, { Suspense } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Header, Loading, Router1, Router2 } from './component';
import styles from './../style/style.scss';

export default function Root() {
    const { userInfo } = useSelector(state=>state.global);

    return (
            <HashRouter getUserConfirmation={(message, callback) => {
                const allowTransition = window.confirm(message);
                callback(allowTransition);
            }} >
                <div>
                    <Header/>

                    {
                        <div className={styles.content}>
                            <Suspense fallback={ <Loading /> }>
                                <Route path="/" exact component={Router1}/>
                                <Route path="/router1" component={Router1}/>
                                <Route path="/router2" exact component={Router2}/>
                                <Route path={["/router2/:id", "/router3/:id"]} component={Router2}/>
                            </Suspense>
                        </div>
                    }
                </div>
            </HashRouter>
    )
}
