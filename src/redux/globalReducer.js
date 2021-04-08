const INIT_STATE = {
    list: [1,2,3,4,5,6,7]
};

export default function global(initState=INIT_STATE, action){
    switch(action.type){
        case "UPDATE_USERINFO":
            return { ...initState, userInfo: action.data }
        case "UPDATE_LOADING":
            return { ...initState, isLoading: action.data }
        default:
            return initState;
    }
}