import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className='NavigationItems'>
        {/* active is a boolean, we dont have to say active={true}, it is enough as it is */}
        <NavigationItem link="/" exact >Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Log In</NavigationItem>
            : <NavigationItem link="/logout">Log Out</NavigationItem>}
    </ul>
);

export default navigationItems;