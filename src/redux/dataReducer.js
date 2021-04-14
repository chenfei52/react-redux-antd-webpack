const INIT_STATE = {
    userInfo: null
};

//用来存储从后端获取的数据
export default function serverData(initState=INIT_STATE, action){
    switch(action.type){
        case "UPDATE_USERINFO":
            return { ...initState, userInfo: action.data }
        default:
            return initState;
    }
}