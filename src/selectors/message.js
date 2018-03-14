export const renderMessage = (messages, id) => {
    return messages.filter(message => message.id === id)
};