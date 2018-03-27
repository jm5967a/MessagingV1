import React from 'react';
import {connect} from 'react-redux';
import {ContactItem} from "./ContactItem";

export const ContactBar = ({contacts}) => (
    <div className={"contact-bar"}>
        {/*<div className={"contact-bar-button"}>
            <button>New Message</button>
        </div>*/}
        <div className={"list-body"}>
            <ContactItem key={"8888"} id={"8888"} number={"Send New Message"}/>
            {(contacts.length===undefined || contacts.length === 0) ? <p className={"list-item"}>No Contacts</p> : (contacts.map((contact)=> (
                <ContactItem key={contact.id} {...contact} />)
            ))}

        </div>
    </div>
);

const mapStateToProps = (state)=> ({
    contacts: state.contact
});

export default connect(mapStateToProps)(ContactBar)