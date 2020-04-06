import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

// capital letters - they will be used as global constants
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


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
        },  
        // base price for a burger regardless of the ingredients is 4 
        totalPrice: 4 
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }

    removeIngredientHandler = (type) => {

    }



    render () {
        return (
            <Aux>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls ingredientAdded={this.addIngredientHandler}/>
            </Aux>
            );
        }
    }
    
    export default BurgerBuilder;