/* eslint-disable */
import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Header, Router1, Router2} from './component';
import {ContextProvider} from "@src/redux/reducer";
import styles from './../style/style.scss';

export default function Root() {
    return (
        <ContextProvider>
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
        </ContextProvider>
    )
}
