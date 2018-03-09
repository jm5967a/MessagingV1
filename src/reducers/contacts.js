export default (state = {}, action) => {
    switch (action.type){
        case 'SET-CONTACTS':
            return action.contact;
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}