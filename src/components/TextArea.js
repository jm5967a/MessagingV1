import React from 'react';
import {Message} from "./Message";
import MessageInput from "./MessageInput";


export const TextArea = (props) => {
        return (
            <div className={"message-box"}>
                <div className={"message-box--text-area"}>
                    {props.messages === undefined ? "" : props.messages.map((message) => (
                        <Message key={message.id} {...message}/>
                    ))}
                </div>
                <MessageInput number={props.number}/>
            </div>
        );
};