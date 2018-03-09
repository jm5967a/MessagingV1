import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {login, logout,logouts} from './actions/auth'
import AppRouter, {history} from './routers/AppRouter'
import configureStore from './store/configureStore'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase'
import LoadingPage from './components/LoadingPage'
import {startAddContact,startSetContact} from "./actions/contacts";
import {startSetMessages, startAddMessage} from "./actions/messages";


const store = configureStore();

const jsx = (
    <Provider store={store}>
    <AppRouter/>
    </Provider>
);

    /*.then(()=>{
        return startAddContact({name: "tatum", phone: "6154847984"})
        .then(()=>{
            startSetContact();
    });
});*/

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered){
      ReactDOM.render(jsx, document.getElementById('app'));
      hasRendered = true;
  }
};
ReactDOM.render(<LoadingPage />, document.getElementById('app'));



firebase.auth().onAuthStateChanged((user)=>{
   if (user){
       store.dispatch(login(user.uid));
       // store.dispatch(startAddMessage({body: "hello", createdAt: 0, type: "incoming", destination: "5409039161", sentFlag: false}))
      /* store.dispatch(startAddContact({name: "jon", number: "5409039161"})).then(()=>{
           store.dispatch(startAddContact({name: "tatum", number: "6154847984"}))});*/
       store.dispatch(startSetContact()).then(()=>{
           store.dispatch(startSetMessages()).then(()=>{
               renderApp();
               if (history.location.pathname === '/') {
                   history.push('/dashboard');
               }
           });

       });
     /*  store.dispatch(startAddContact({name: "jon", phone: "5409039161"})).then(()=>{
            store.dispatch(startAddContact({name: "tatum", phone: "6154847984"}))
               .then(()=>{
                   store.dispatch(startSetContact());
               });
       });*/


   }
   else{
       store.dispatch(logout());
       renderApp();
       history.push('/');
   }
});



