/* eslint-disable */
import React, { useEffect, useContext, Suspense } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Header, Loading, Router1, Router2 } from './component';
import { globalContext } from "@src/redux/reducer";
import styles from './../style/style.scss';

export default function Root() {
    const { state, dispatch } = useContext(globalContext);
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
