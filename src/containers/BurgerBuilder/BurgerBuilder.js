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
        totalPrice: 4,
        // will turn true if at least one ingredient has been added to the order
        purchasable: false 
    }

    updatePurchaseState (ingredients) {
        
        // the keys will create an array of strings entries, such as salad, bacon, cheese etc
        const sum = Object.keys(ingredients)
        .map(igKey => {
            // we will return the values of each key = amounts of each ingredient
            return ingredients[igKey]
            // we get a sum of all ingredients 
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        // this will evaluate to true or false
        this.setState({purchasable: sum > 0});
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
        this.updatePurchaseState(updatedIngredients);
    }
    // we pass this method to the BuildControls tag 
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        // if we keep clicking the minus button, we would get an error if the count goes to less than 0
        // this way we prevent the error
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }



    render () {
        const disabledInfo = {
            // we create a copy if the ingredients
            ...this.state.ingredients
        };
        // we loop through all the keys of the ingredients
        for (let key in disabledInfo) {
            // if the count of that ingredient is 0 or smaller, this will be set to true
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            // we will now use this method in BuildControls js
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            />
            </Aux>
            );
        }
    }
    
    export default BurgerBuilder;