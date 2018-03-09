import database from '../firebase/firebase'


export const setMessages = (messages) => ({
    type: "SET-MESSAGES",
    messages
});

export const startSetMessages = () => {
    return (dispatch, getState) => {
       const uid = getState().auth.uid;
       return database.ref(`users/${uid}/messages`).once('value').then((snapshot)=>{
           let messageArray = [];
           snapshot.forEach((childSnapshot)=>{
               messageArray.push({
                   id: childSnapshot.key,
                   ...childSnapshot.val()
               })
           });
           dispatch(setMessages(messageArray))
       })

    }
};

export const addMessage = (messages)=> ({
    type: "ADD-MESSAGE",
    ...messages
});

export const startAddMessage= ({body, createdAt, type, destination, sentFlag}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/messages`).push({body,createdAt, type, destination, sentFlag}).then((ref)=> {
            dispatch(addMessage({
                id: ref.key,
                body,
                createdAt,
                type,
                destination,
                sentFlag
            }))
        })
    }
};