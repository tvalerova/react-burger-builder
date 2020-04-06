import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

// this is a class because we want to manage state here
class BurgerBuilder extends Component {
    // we could also manage the state this way, but using only state is a more modern syntax
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    
    state = {
        ingredients: {
            salad: 0, 
            bacon: 0,
            cheese: 0,
            meat: 0
        }
        
    }
    
    render () {
        return (
            <Aux>
            <Burger ingredients={this.state.ingredients} />
            <div>Build Controls</div>
            </Aux>
            );
        }
    }
    
    export default BurgerBuilder;