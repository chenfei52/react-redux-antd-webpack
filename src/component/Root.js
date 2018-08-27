import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, IndexRoute } from 'react-router-dom';
import { Button } from "antd";
import { Header } from './component';
import './../style/style.scss';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
    }
    render (){
        return (
            <Provider store={ this.props.store } >
                <HashRouter>
                    <div>
                        <div>
                            <Header/>
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