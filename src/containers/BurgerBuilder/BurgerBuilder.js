import React, { Component } from 'react';

import Aux from '../../hoc/Aux';

// this is a class because we want to manage state here
class BurgerBuilder extends Component {
    render () {
        return (
            <Aux>
                <div>Burger</div>
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;