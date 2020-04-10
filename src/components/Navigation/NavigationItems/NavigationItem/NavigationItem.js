import React from 'react';
import './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
    <li className='NavigationItem'>
        <NavLink
            to={props.link}>
            {/* if the prop is active, we will give it class active
            since we changed this to navlink, we don;t need to add the class, it will be done automatically
            className={props.active ? 'active' : null}  */}
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;