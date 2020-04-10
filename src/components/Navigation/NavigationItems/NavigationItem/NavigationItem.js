import React from 'react';
import './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
    <li className='NavigationItem'>
        <NavLink
            to={props.link}
            // jsx assigns a randonm name to the class, so we assign it our own name
            activeClassName='active'
            // to make the active class and its styling work only on the active link, we set up the exact property in NavigationItems.js
            // because in NavigationItems.js the links both start with / so both match - we add the exact keyword to the root path link
            exact={props.exact}>
            {/* if the prop is active, we will give it class active
            since we changed this to navlink, we don;t need to add the class, it will be done automatically
            className={props.active ? 'active' : null}  */}
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;