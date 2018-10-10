export function global( initState = {}, action ){
    switch (action.type){
        case 'USERINFO':
            return Object.assign({}, initState, { userInfo: action.data });
        default:
            return initState;
    }
}
