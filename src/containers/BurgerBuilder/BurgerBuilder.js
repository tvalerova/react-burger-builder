import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

// this is a class because we want to manage state here
class BurgerBuilder extends Component {
    // we could also manage the state this way, but using only state is a more modern syntax
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    // this will remain managed in state because it is local UI, there is no need to manaage these throguh redux
    state = {
        // we removed the ingredients object we had previously and set it to null, because we will fetch the ingredients from Firebase
        // will turn true if at least one ingredient has been added to the order
        // purchasable: false, no longer needed, we will manage this somewhere else
        // we need to know if the order button was clicked
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        // temporarily commenting this out
        // axios.get('https://react-my-burger-125ab.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
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
        // this.setState({ purchasable: sum > 0 });  we don't need this anymore, we don't use setState
        return sum > 0;
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
    // // we will pass the real ingredients we picked onto the checkout container
    //     const queryParams = [];
    //     // we iterate over the ingredients we have to push them into the array
    //     for (let i in this.state.ingredients) {
    //         // encodeURIComponent encodes my elements in a way that they can be used in the URL and then passed to the search
    //         // we are basically setting the key=0, such as salad=0
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    //     }
    //     // we also want to pass the price with the params
    //     queryParams.push('price=' + this.state.totalPrice);
    //     // this is what we want to get: bacon=1&cheese=1&meat=1&salad=0
    //     const queryString = queryParams.join('&');

        // this.props.history.push({
            // pathname: '/checkout',
            // // search is where we pass the ingredients
            // // this will be the result after the root path: /checkout?bacon=1&cheese=1&meat=1&salad=0
            // search: '?' + queryString
        // });

        // we will get the ingredients from the redux store
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            // we create a copy if the ingredients
            ...this.props.ings
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
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        // we will now use this method in BuildControls js
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        // this method will get executed when we click the order now button
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Aux>
            );
            // we moved the OrderSummary tag in here from inside the <Modal>
            // if the state is loading we want to show the spinner instead of OrderSummary
            orderSummary = <OderSummary
                ingredients={this.props.ings}
                price={this.props.price}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    }
}


// the other way of using HOC - we wrap the export with it
// because we have two arguments in the HOC, we need to have two args here as well
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));