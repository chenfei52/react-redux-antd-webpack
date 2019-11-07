import React from 'react';
import { withRouter } from "react-router-dom";
import style from './index.scss';

function Router2(){
    return (
        <div className={ style.class }>
            路由2
        </div>
    )
}
export default withRouter(Router2);
