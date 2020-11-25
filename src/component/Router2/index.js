import React from 'react';
import { withRouter } from "react-router-dom";
import { groupByFirstLetter } from '@src/util/util';
import './index.scss';

function Router2(){
    console.log('router2 渲染')
    let res = groupByFirstLetter(['11', 'wasdf'])
    return (
        <div className="color" >22222
            {JSON.stringify(res)}
        </div>
    )
}
export default withRouter(Router2);
