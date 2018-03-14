export default (state = {}, action) => {
    switch (action.type) {
        case 'SET-NUMBER':
            return action.number;
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}