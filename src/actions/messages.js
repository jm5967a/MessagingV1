import uuid from 'uuid';
import database from '../firebase/firebase'
import {startSetContact} from "./contacts";
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
        let flag = 0;
        const uid = getState().auth.uid;
        database.ref(`users/${uid}/messages/`).limitToLast(1).on('child_added', () => {
            flag === 0 ? flag = 1 : dispatch(startSetup());
        });
    }
};

const databaseWatch = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        getState().messages.forEach(({number}) => {
            database.ref(`users/${uid}/messages/${number}`).orderByChild('createdAt')
                .startAt(moment.now()).on('child_added', (snapshot) => {
                dispatch(addMessage({
                    id: snapshot.key,
                    ...snapshot.val()
                }))
            });
        });
    }
};

const setMessages = (messages) => ({
    type: "SET-MESSAGES",
    messages
});


export const startAddMessage = ({body, createdAt = moment.now(), type = "outgoing", source, destination, sentFlag = false}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        console.log(body);
        return database.ref(`users/${uid}/messages/${destination}`)
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
                    lastMessage: 0,
                    name: ""
                });
                childSnapshot.forEach((grandChild) => {
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
            dispatch(startSetContact(contactsArray));
            dispatch(setMessages(mainArray));
            dispatch(databaseWatch());
            dispatch(contactWatch());
        })
    };
};


