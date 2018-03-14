import database from '../firebase/firebase'

export const setContact = (contact) => ({
        type: "SET-CONTACTS",
        contact
    }
);

export const startSetContact = (contactsArray) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        database.ref(`users/${uid}/contacts`).set(contactsArray);
        dispatch(setContact(contactsArray));
    }
};

