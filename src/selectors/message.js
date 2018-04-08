export const renderMessage = (messages, id) => {
    //return messages.filter(message => message.id === id)
    return (typeof id === "string" ? [messages.find(message => message.id === id)] : [])
};

