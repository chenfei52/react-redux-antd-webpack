/* eslint-disable */
import React, { useEffect, useContext, Suspense, Fragment } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Header, Loading, Login, LeftMenu } from './component';
import { globalContext } from "@src/redux/reducer";
import './../style/style.scss';

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
                    <div className="content">
                        <Suspense fallback={ <Loading /> }>
                            <Route path="/" exact component={ Login }/>
                            <Route path="/login" component={ Login }/>
                            <Route path="/admin" component={ Admin }/>
                        </Suspense>
                    </div>
                }
            </div>
        </HashRouter>
    )
}

function Admin(){
    return (
        <div className="admin-container">
            <Header />
            <LeftMenu />
            <Fragment>
                {/*<Route path="/admin" component={ null }/>*/}
            </Fragment>
        </div>
    )
}
