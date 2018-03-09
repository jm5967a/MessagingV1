import React from 'react';
import {connect} from 'react-redux';
import {ContactItem} from "./ContactItem";

export const ContactBar = ({contacts}) => (
    <div className={"contact-bar"}>
        <div className={"list-body"}>
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