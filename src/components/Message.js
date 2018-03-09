import React from 'react';

export const Message = ({body, type}) => (
    (type === "outgoing" ? <p className={"message-box--message message-box--message-outgoing"}>{body}</p>:
        <p className={"message-box--message message-box--message-incoming"}>{body}</p>)


);