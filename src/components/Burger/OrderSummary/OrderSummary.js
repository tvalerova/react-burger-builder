import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

// this could be a functional component, we only turned it into a class to be able to use a lifecycle hook
class OrderSummary extends Component {
    // we added a Lifecycle hook to show in the console that OderSummary updates everytime we add an ingredient, even though we cannot see the ordersummary
    // this is not good for performance - we will improve this in Modal.js
    // componentWillUpdate() {
    //     console.log('[OrderSummary] Will Update')
    // }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                    return ( <
                        li key = { igKey } >
                        <
                        span style = {
                            { textTransform: "capitalize" } } > { igKey } < /span>: { this.props.ingredients[igKey] } <
                        /li>)
                    });

                return ( <
                    Aux >
                    <
                    h3 > Your order < /h3> <
                    p > A delicious burger with the following ingredients: < /p> <
                    ul > { ingredientSummary } <
                    /ul> <
                    p > < strong > Total Price: { this.props.price.toFixed(2) } < /strong></p >
                    <
                    p > Continue to checkout ? < /p> <
                    Button btnType = 'Danger'
                    clicked = { this.props.purchaseCanceled } > CANCEL < /Button> <
                    Button btnType = 'Success'
                    clicked = { this.props.purchaseContinued } > CONTINUE < /Button> <
                    /Aux>
                );
            }
    }

    export default OrderSummary;