import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        purchasable: false,
        // we need to know if the order button was clicked
        purchasing: false
    }

    updatePurchaseState(ingredients) {

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
        this.setState({ purchasable: sum > 0 });
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
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
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
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    // originally we used this syntax, but it did not work
    // purchaseHandler () {
    //     this.setState({purchasing: true});
    // }
    // this syntax does not work correctly when we try to use "this" keyword in there
    // if the method is triggered through an event - in this case "this" will then not refer to the class
    // we need to use arrow function

    // this method should be triggered when we click the order button
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert('You continue');
        const order = {
            ingredients: this.state.ingredients,
            // in a real app this would not be the actual set up - we would recalculate the price on the server
            price: this.state.totalPrice,
            // here we just pass some dummy data
            customer: {
                name: 'Tereza',
                address: {
                    street: 'Oosterstraat 1',
                    zip: '1211KZ',
                    country: 'Netherlands'
                },
                email: 'Tereza@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        // this is the url that gets appended to the base URL; for Firebase to function, we need to add .json as an end point - in a real app it would be something else
        axios.post('/orders.json', order)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    render() {
        const disabledInfo = {
            // we create a copy if the ingredients
            ...this.state.ingredients
        };
        // we loop through all the keys of the ingredients
        for (let key in disabledInfo) {
            // if the count of that ingredient is 0 or smaller, this will be set to true
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // we moved the OrderSummary tag in here from inside the <Modal>
        // if the state is loading we want to show the spinner instead of OrderSummary
        let orderSummary = <OderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        
            if (this.state.loading) {
                orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {/* we output the orderSummary dynamically, it was defined above */}
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    // we will now use this method in BuildControls js
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    // this method will get executed when we click the order now button
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;