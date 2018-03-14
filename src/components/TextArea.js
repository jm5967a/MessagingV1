import React from 'react';
import {connect} from "react-redux";
import {Message} from "./Message";
import {startAddMessage} from "../actions/messages";

export class TextArea extends React.Component {
    state = {
      input: ""
    };

    handleChange = (e)=> {
        const input = e.target.value;
        this.setState(()=>({
            input
        }));
    };

    handleSubmit = () => {
        const message = this.state.input;
        this.setState(()=>({
            input:""
        }));
        this.props.dispatch(startAddMessage({body: message, destination: this.props.number}));
        console.log(`Submitted ${message}`)
    };

    render(){
        return (
            <div className={"message-box"}>
                <div className={"message-box--text-area"}>
                    {this.props.messages.map((message)=>(
                        <Message key={message.id} {...message}/>
                    ))}
                </div>
                <div className={"message-box--send-box"}>
                    <textarea className={"message-box--input"}
                              value={this.state.input}
                              onChange={this.handleChange}
                              placeholder={"Write your message here"}/>
                    <div className={"message-box--send-button"}>
                        <button onClick={this.handleSubmit} className={"button--send"}>Send</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

export default connect(mapStateToProps)(TextArea);
