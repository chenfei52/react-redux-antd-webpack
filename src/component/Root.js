/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { Header, Router1, Router2 } from './component';
import styles from './../style/style.scss';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
    }
    render (){
        return (
            <Provider { ...this.props } >
                <HashRouter>
                    <div>
                        <Header/>

                        {
                            <div className={ styles.content }>
                                <Route path="/" exact component={ Router1 } />
                                <Route path="/router1" component={ Router1 } />
                                <Route path="/router2" component={ Router2 } />
                            </div>
                        }
                    </div>
                </HashRouter>
            </Provider>
        )
    }
}
