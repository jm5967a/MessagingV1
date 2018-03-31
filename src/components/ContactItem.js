import React from 'react';
import {Link} from 'react-router-dom'

export const ContactItem = ({name = "", number, id, selected}) => (
    <Link
        className={selected ? "list-item-selected" : "list-item"}
        to={`/${id}`}>
        {name !== "" ? name : number}

    </Link>
);