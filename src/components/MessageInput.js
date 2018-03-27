import React from 'react';
import {connect} from 'react-redux';
import {startAddMessage} from "../actions/messages";


export class MessageInput extends React.Component {
    state = {
        input: ""
    };

    handleChange = (e) => {
        const input = e.target.value;
        this.setState(() => ({
            input
        }));
    };

    handleSubmit = () => {
        const message = this.state.input;
        this.setState(() => ({
            input: ""
        }));
        this.props.dispatch(startAddMessage({body: message, destination: this.props.number}));
        console.log(`Submitted ${message}`)
    };

    render() {
        return (
            <div className={this.props.container !== undefined ? this.props.container : "message-box--send-box"}>
                    <textarea className={this.props.textbox !== undefined ? this.props.textbox : "message-box--input"}
                              value={this.state.input}
                              onChange={this.handleChange}
                              placeholder={"Write your message here"}/>
                <div className={"message-box--send-button"}>
                    <button onClick={this.props.handleSubmit !== undefined ?
                        () => {
                            this.props.handleSubmit(this.state.input);
                            this.setState(() => ({
                                input: ""
                            }))
                        }
                        : this.handleSubmit} className={"button--send"}>Send
                    </button>
                </div>
            </div>
        )
    }
}

export default connect()(MessageInput)