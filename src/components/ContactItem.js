import React from 'react';
import {Link} from 'react-router-dom'

export const ContactItem = ({name,number,id}) => (
    <Link className={"list-item"} to={`/${id}`}>{number}</Link>
);