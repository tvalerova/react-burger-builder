import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = () => (
    <ul className='NavigationItems'>
        {/* active is a boolean, we dont have to say active={true}, it is enough as it is */}
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;