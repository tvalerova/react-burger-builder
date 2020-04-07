import React from 'react';
import Aux from '../../hoc/Aux';
import './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
    <Aux>
        <Toolbar />
        <SideDrawer />
        <main className='Content'>
            {/* here we will output the component we wrap with the layout */}
            {props.children}
        </main>
    </Aux>
);

export default layout;