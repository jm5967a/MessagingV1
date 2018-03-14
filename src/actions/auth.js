import {authorization, googleAuthProvider} from '../firebase/firebase'

export const login = (uid) => ({
   type: 'LOGIN',
   uid
});

export const startLogin = () => {
  return () => {
      return authorization.signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
    type: 'LOGOUT'
});


export const startLogout = () => {
  return () => {
      return authorization.signOut();
  }
};