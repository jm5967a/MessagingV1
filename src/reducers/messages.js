export default (state = {}, action) => {
    switch (action.type){
        case 'SET-MESSAGES':
            return action.messages;
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}