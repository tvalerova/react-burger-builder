import React from 'react';
import './NavigationItem.css';

const navigationItem = (props) => (
    <li className='NavigationItem'>
        <a
            href={props.link}
            // if the prop is active, we will give it class active
            className={props.active ? 'active' : null} >
            {props.children}
        </a>
    </li>
);

export default navigationItem;