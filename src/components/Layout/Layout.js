import React from 'react';
import Aux from '../../hoc/Aux';

const layout = (props) => (
    <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>
    {/* here we will output the component we wrap with the layout */}
    {props.children}
    </main>
    </Aux>
    );

    export default layout;