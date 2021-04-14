const INIT_STATE = {
    hideTopMenu: false
};

//用来存储一些用户交互状态
export default function globalStatus(initState=INIT_STATE, action){
    switch(action.type){
        case "HIDE_TOP_MENU":
            return { ...initState, hideTopMenu: action.data }
        default:
            return initState;
    }
}