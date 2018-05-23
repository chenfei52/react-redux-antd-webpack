export function global( initState = {}, action ){
    switch (action.type){
        case 'GLOBAL_DATA':
            return Object.assign({}, initState, action.data);
        default:
            return initState;
    }
}