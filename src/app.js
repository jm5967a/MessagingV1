import React from 'react';
import ReactDOM from 'react-dom';
import {authorization} from './firebase/firebase'
import {Provider} from 'react-redux'
import AppRouter, {history} from './routers/AppRouter'
import configureStore from './store/configureStore'
import LoadingPage from './components/LoadingPage'
import {login, logout} from './actions/auth'
import {startSetup,} from "./actions/messages";
import 'normalize.css/normalize.css';
import './styles/styles.scss';


const store = configureStore();

const jsx = (
    <Provider store={store}>
    <AppRouter/>
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered){
      ReactDOM.render(jsx, document.getElementById('app'));
      hasRendered = true;
  }
};
ReactDOM.render(<LoadingPage />, document.getElementById('app'));


authorization.onAuthStateChanged((user) => {
   if (user){
       store.dispatch(login(user.uid));
       store.dispatch(startSetup()).then(() => {
           renderApp();
           if (history.location.pathname === '/') {
               history.push('/dashboard');
           }
       })
   }
   else{
       store.dispatch(logout());
       renderApp();
       history.push('/');
   }
});


