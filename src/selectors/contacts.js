export const contactSort = (contacts) => {
    return contacts.sort((a, b) => {
        return b.lastMessage - a.lastMessage;
    })
};