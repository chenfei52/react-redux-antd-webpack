import React, { useContext, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { globalContext } from "@src/redux/reducer";
import style from './index.scss';

function Router2(){
    const { state, dispatch } = useContext(globalContext);
    useEffect(()=>{
        dispatch({
            type: "USERINFO",
            data: {
                name: "test"
            }
        });
    }, []);
    console.log(state);
    return (
        <div className={ style.class }>
            路由2
        </div>
    )
}
export default withRouter(Router2);
