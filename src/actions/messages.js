import uuid from 'uuid';
import database from '../firebase/firebase'
import {contactSort} from "../selectors/contacts";
import {addContact, setContact, startSetContact} from "./contacts";
import moment from "moment";


export const addMessage = (message) => {
    return (dispatch, getState) => {
        const messages = getState().messages.map((snapshot) => {
            if (snapshot.number === message.destination) {
                return {...snapshot, message: [...snapshot.message, message]};
            }
            else {
                return {...snapshot}
            }
        });
        dispatch(setMessages(messages));
    };
};

const contactWatch = () => {
    return (dispatch, getState) => {
        let initialDataLoaded = false;
        const uid = getState().auth.uid;
        database.ref(`users/${uid}/messages/`).on('child_added', (snapshot) => {
            if (initialDataLoaded) {
                const timeStamp = moment.now();
                const id = uuid();
                database.ref(`users/${uid}/messages/${snapshot.key}/contactData`)
                    .update({name: "", lastMessage: timeStamp});
                dispatch(addContact({id, lastMessage: timeStamp, number: snapshot.key, name: ""}));
                snapshot.child('messageData').forEach((childSnapshot) => {
                    const message = getState().messages;
                    dispatch(setMessages([...message, {
                        id, number: snapshot.key,
                        message: [{...childSnapshot.val(), id}]
                    }]))
                });
                dispatch(databaseListener(snapshot.key))
            }
        });
        database.ref(`users/${uid}/messages/`).once('value', () => {
            initialDataLoaded = true;
        });
    }
};

const databaseListener = (number) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        database.ref(`users/${uid}/messages/${number}/messageData`).orderByChild('createdAt')
            .startAt(moment.now()).on('child_added', (snapshot) => {
            database.ref(`users/${uid}/messages/${number}/contactData`)
                .update({lastMessage: snapshot.val().createdAt});
            const currentContacts = getState().contact;
            const newContacts = currentContacts.map((contact) => {
                if (contact.number === snapshot.val().destination) {
                    return ({...contact, lastMessage: moment.now()})
                }
                else {
                    return (contact)
                }
            });
            dispatch(setContact(contactSort(newContacts)));
            dispatch(addMessage({
                id: snapshot.key,
                ...snapshot.val()
            }))
        });
    }
};

const setupDatabaseWatch = () => {
    return (dispatch, getState) => {
        getState().messages.forEach(({number}) => {
            dispatch(databaseListener(number))
        });
    }
};

const setMessages = (messages) => ({
    type: "SET-MESSAGES",
    messages
});


export const startAddMessage = ({
                                    body,
                                    createdAt = moment.now(),
                                    type = "outgoing",
                                    source,
                                    destination,
                                    sentFlag = false
                                }
) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/messages/${destination}/messageData`)
            .push({body, createdAt, type, destination, sentFlag})
    }
};

export const startSetup = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/messages`).once('value').then((snapshot) => {
            let mainArray = [];
            let contactsArray = [];
            snapshot.forEach((childSnapshot) => {
                const id = uuid();
                let messageArray = [];
                contactsArray.push({
                    id,
                    number: childSnapshot.key,
                    lastMessage: childSnapshot.child("contactData").val().lastMessage,
                    name: childSnapshot.child("contactData").val().name
                });
                childSnapshot.child("messageData").forEach((grandChild) => {
                    messageArray.push(
                        {
                            id: grandChild.key,
                            ...grandChild.val()
                        });
                });
                mainArray.push({
                    id,
                    number: childSnapshot.key,
                    message: messageArray
                });
            });
            dispatch(startSetContact(contactSort(contactsArray)));
            dispatch(setMessages(mainArray));
            dispatch(setupDatabaseWatch());
            dispatch(contactWatch());
        })
    };
};


