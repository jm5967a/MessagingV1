import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import contactReducer from '../reducers/contacts'
import messageReducer from '../reducers/messages'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            contact: contactReducer,
            messages: messageReducer

        }),
        composeEnhancers(applyMiddleware(thunk))
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};

