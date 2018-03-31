import database from '../firebase/firebase'
import {contactSort} from "../selectors/contacts";

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

export const addContact = (contact) => {
    return (dispatch, getState) => {
        const currentContacts = getState().contact;
        dispatch(setContact(contactSort([contact, ...currentContacts])));
    }
};

