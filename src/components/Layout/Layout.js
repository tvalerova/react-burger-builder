import React from 'react';

const layout = (props) => (
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>
        {/* here we will output the component we wrap with the layout */}
        {props.children}
    </main>
);