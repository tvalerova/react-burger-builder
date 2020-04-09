import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        // we removed the ingredients object we had previously and set it to null, because we will fetch the ingredients from Firebase
        ingredients: null,
        // base price for a burger regardless of the ingredients is 4 
        totalPrice: 4,
        // will turn true if at least one ingredient has been added to the order
        purchasable: false,
        // we need to know if the order button was clicked
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        axios.get('https://react-my-burger-125ab.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({error: true})
            });
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

        // this.setState({ loading: true });

        // const order = {
        //     ingredients: this.state.ingredients,
        //     // in a real app this would not be the actual set up - we would recalculate the price on the server
        //     price: this.state.totalPrice,
        //     // here we just pass some dummy data
        //     customer: {
        //         name: 'Tereza',
        //         address: {
        //             street: 'Oosterstraat 1',
        //             zip: '1211KZ',
        //             country: 'Netherlands'
        //         },
        //         email: 'Tereza@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // // this is the url that gets appended to the base URL; for Firebase to function, we need to add .json as an end point - in a real app it would be something else
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         // once we have a response, we want to stop loading
        //         // to close the modal after the response, we set purchasing to false
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //     .catch(error => {
        //         // we also want to stop loading if we have an error
        //         // to close the modal after the response, we set purchasing to false
        //         this.setState({ loading: false, purchasing: false });
        //     });
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

        // we start with the order summary of null at the beginning
        let orderSummary = null;

        // by default the burger is a spinner for a fraction of a second, until it loads
        // if they cannot be loaded we output a message to the user
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
       
        // once the ingredients load we will show the burger
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        // we will now use this method in BuildControls js
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        // this method will get executed when we click the order now button
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>
            );
            // we moved the OrderSummary tag in here from inside the <Modal>
            // if the state is loading we want to show the spinner instead of OrderSummary
            orderSummary = <OderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        // if the state is loading, show spinner
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {/* we output the orderSummary dynamically, it was defined above */}
                    {orderSummary}
                </Modal>
                {/* we output burger dynamically */}
                {burger}
            </Aux>
        );
    }
}
// the other way of using HOC - we wrap the export with it
// because we have two arguments in the HOC, we need to have two args here as well
export default withErrorHandler(BurgerBuilder, axios);