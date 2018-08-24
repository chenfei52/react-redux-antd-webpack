export function global( initState = {}, action ){
    switch (action.type){
        case 'USERINFO':
            return Object.assign({}, initState, action.data);
        default:
            return initState;
    }
}