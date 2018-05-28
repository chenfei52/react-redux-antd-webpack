import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, IndexRoute } from 'react-router-dom';
import { Button } from "antd";

import initRedux from './../redux/initRedux';
import './index.scss';

const store = initRedux();
//监听state变化
store.subscribe(()=>
    console.log(store.getState())
);

export default class Root extends React.Component {
    constructor(props) {
        super(props);
    }
    render (){
        return (
            <Provider store={ store } >
                <HashRouter>
                    <div>
                        <div>
                            <h1><Button type="primary">Hello</Button></h1>
                        </div>
                        {
                            <div>
                                {/*<Route path="/" component={} />*/}
                            </div>
                        }
                    </div>
                </HashRouter>
            </Provider>
        )
    }
}