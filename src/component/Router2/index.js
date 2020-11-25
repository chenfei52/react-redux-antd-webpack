import React from 'react';
import { withRouter } from "react-router-dom";
import './index.scss';

function Router2(){
    console.log('router2 渲染')

    return (
        <div className="color" >22222
        </div>
    )
}
export default withRouter(Router2);
