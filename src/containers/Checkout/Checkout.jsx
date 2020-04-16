import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    // state = {
    //     ingredients: {
    //         salad: 1,
    //         meat: 1,
    //         cheese: 1,
    //         bacon: 1
    //     }
    // }

    // here we need to pass the query to the checkout component, so we have the information about the ordered burger
    // componentWillMount() {
    //     // we need to extract the query params
    //     const query = new URLSearchParams(this.props.location.search);
    //     // a new object to store the chosen ingredients
    //     const ingredients = {};
    //     let price = 0;
    //     // we loop through the different query params
    //     for (let param of query.entries()) {
    //         // total price is not an ingredient, so we should not push it into the ingredients array
    //         // we check if the first param is price
    //         if (param[0] === 'price') {
    //             // we will store the price in the variable
    //             price = param[1];
    //             // if price is not the first param we push the param into ingredients
    //         } else {
    //             // this will be the format ['salad', '1']; again we set up the key = value, and convert the value into a number with +
    //             ingredients[param[0]] = +param[1];
    //         }

    //     }
    //     // we set the state of the ingredients to the ingredients object we just created
    //     this.setState({ ingredients: ingredients, totalPrice: price });
    // }

    checkoutCanceledHandler = () => {
        // goBack is a utility method in the history object
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ings) {
            summary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCanceled={this.checkoutCanceledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        // when we pass the ContacData into render and not as component, we can pass props to it
                        // render={(props) => (<ContactData ingredients={this.state.ingredients}
                        //     // because we are rendering the contact data component manually and not through the component prop
                        //     // we don't have access to the props objects such as history and location - we therefore passed it to render
                        //     // and distribute the with the spread operator - then the push method in ContactData will work and after clicking Order we will be redirected to homepage
                        //     price={this.state.totalPrice} {...props} />)} 
                        component={ContactData} />
                </div>
            );
        }
        return (
            { summary }
        )
    }
}

// we do not need dispatch here because we are not dispatching anything in this container
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
    }
};

export default connect(mapStateToProps)(Checkout);