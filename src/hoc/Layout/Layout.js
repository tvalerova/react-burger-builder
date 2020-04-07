import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    SideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        // if showSideDrawer is true, it will be switched to false and vice versa
        //  this is the clean way of setting up new state when we depend on the old state
        // setState is asynchronous and it might lead to unexpected outcomes, that is why we write it this way

        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        return ( <
            Aux >
            <
            Toolbar drawerToggleClicked = { this.sideDrawerToggleHandler }
            /> <
            SideDrawer open = { this.state.showSideDrawer }
            closed = { this.SideDrawerClosedHandler }
            /> <
            main className = 'Content' > { /* here we will output the component we wrap with the layout */ } { this.props.children } <
            /main> <
            /Aux>
        )
    }
};

export default Layout;