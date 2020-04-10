import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    // here we need to pass the query to the checkout component, so we have the information about the ordered burger
    componentDidMount() {
        // we need to extract the query params
        const query = new URLSearchParams(this.props.location.search);
        // a new object to store the chosen ingredients
        const ingredients = {};
        // we loop through the different query params
        for (let param of query.entries()) {
            // this will be the format ['salad', '1']
            // again we set up the key = value, and convert the value into a number with +
            ingredients[param[0]] = +param[1];
        }
        // we set the state of the ingredients to the ingredients object we just created
        this.setState({ ingredients: ingredients });
    }

    checkoutCanceledHandler = () => {
        // goBack is a utility method in the history object
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        )
    }
}

export default Checkout;