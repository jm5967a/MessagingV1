import database from '../firebase/firebase'

export const startAddContact = (contactData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            name = "",
            number = "",
            lastMessage = 0
        } = contactData;
        const contact = {name, number, lastMessage};
        console.log(contact);
        return database.ref(`users/${uid}/contacts`).push(contact).then(()=>{
            console.log("Added")
        });
}};

const setContact = (contact) => ({
        type: "SET-CONTACTS",
        contact
    }
);

export const startSetContact = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/contacts`).once('value').then((snapshot)=> {

            const contactArray = [];
            snapshot.forEach((childSnapshot)=> {
                contactArray.push(
                    {id: childSnapshot.key,
                     ...childSnapshot.val()});
            });
            dispatch(setContact(contactArray))
        })
        }
};