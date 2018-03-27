import React from 'react';
import Modal from 'react-modal';
import {history} from '../routers/AppRouter'
import MessageInput from "./MessageInput";
import {startAddMessage} from "../actions/messages";
import {connect} from "react-redux";


export class NewMessage extends React.Component {
    state = {
        number: ""
    };
    handleSubmit = (message) => {
        const number = this.state.number;
        this.setState(() => ({
            number: ""
        }));
        this.props.dispatch(startAddMessage({body: message, destination: this.state.number})).then(() => {
            // history.push(`/${this.props.contacts.id}`);
            const contact = this.props.contacts;
            for (let i = 0; i < contact.length; i++) {
                if (contact[i].number === number) {
                    history.push(`/${contact[i].id}`);
                    break
                }
            }
        })
    };
    handleChange = (e) => {
        const number = e.target.value;
        this.setState(() => ({
            number
        }))
    };

    componentWillMount() {
        Modal.setAppElement('body');
    }

    render() {
        return (
            <Modal
                isOpen={this.props.modal}
                contentLabel="New Message"
                className={"modal"}
            >
                <div className={"modal--close"}>
                    <button className={"button"} onClick={this.props.handleClose}>x</button>
                </div>
                <div className={"modal__text"}>
                    <div className={"message-box"}>
                        <input
                            className={"message-box-new-message-phone"}
                            onChange={this.handleChange}
                            placeholder={"Phone Number"}
                            value={this.state.number}
                        />
                        <MessageInput
                            container={"message-box-new-message-box"}
                            textbox={"message-box-new-message-text"}
                            handleSubmit={this.handleSubmit}
                        />
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    contacts: state.contact
});

export default connect(mapStateToProps)(NewMessage)