import React from 'react';
import {connect} from "react-redux";
import ContactBar from "./ContactBar";
import NewMessage from "./NewMessage";
import {renderMessage} from "../selectors/message";
import {setNumber} from "../actions/filters";
import {TextArea} from './TextArea';

export class DashboardPage extends React.Component {
    state = {
        modal: false
    };

    pathCheck = () => {
        const path = this.props.history.location.pathname.slice(1);
        if (path === "8888") {
            this.setState(() => ({
                modal: true
            }))
        }
        else if (path !== "dashboard") {
            this.props.dispatch(setNumber(path));
            this.props.messages.length === 0 && this.props.history.push('/');
        }
    };

    closeModal = () => {
        this.setState(() => ({
            modal: false
        }));
        this.props.history.push('/');
    };

    componentWillMount() {
        this.pathCheck();
    }

    render() {
        return (
            <div className={'box-layout__dashboard'}>
                <ContactBar/>
                {this.state.modal && <NewMessage modal={this.state.modal} handleClose={this.closeModal}/>}
                {(this.props.messages.length === 0 || this.props.messages.length === undefined)
                    ? <p className={"message-box"}>No Messages</p> : <TextArea messages={this.props.messages[0].message}
                                                                               number={this.props.messages[0].number}/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    messages: state.messages.length !== 0 ? renderMessage(state.messages, state.filters) : [],
    contacts: state.contact,
    filters: state.filters
});

export default connect(mapStateToProps)(DashboardPage);
