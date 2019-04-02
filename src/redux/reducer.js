import React, { useReducer } from "react";

const globalContext = React.createContext();
const initialState = {};

function reducer(state, action){
    console.log(state, action);
    switch(action.type){
        case "USERINFO":
            return Object.assign({}, state, { userInfo: action.data })
    }
}

const ContextProvider = props=>{
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <globalContext.Provider value={{ state, dispatch }}>
            { props.children }
        </globalContext.Provider>
    )
};

export { globalContext, ContextProvider }
