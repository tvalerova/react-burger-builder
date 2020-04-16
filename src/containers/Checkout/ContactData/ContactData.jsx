import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                // this is an error, we will fix this later
                value: 'fastest',
                // we need to add this even though we do not require validation for the dropdown
                // this fixes the error we had when we selected something from the dropdown - because it did not have the validation property, the rules check did not work in the if statement
                validation: {},
                // even though we will select one of the two options, and one will be selected for us by default, we need to add the valid property here
                // because where set formIsValid to true or false, we loop trough the elements and they have to be valid
                // without adding the valid property here, the dropdown will evaluate to udefined which will will be treated as false, so the whole form would be invalid
                valid: true
            }
        },
        formIsValid: false,
    }

    orderHandler = (event) => {
        // we don't want to send the request because it reloads our form
        event.preventDefault();
        // this.setState({ loading: true });

        // this is where we get the data from the form
        const formData = {};
        // the identifier here is country, email, etc.
        for (let formElementIdentifier in this.state.orderForm) {
            // here we create key-value pairs - the formElementIdentifier (such as country) = use input value from the form in the corresponding field
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            // in a real app this would not be the actual set up - we would recalculate the price on the server
            price: this.props.price,
            orderData: formData
        }
        this.props.onOrderBurger(order);
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }


    // here we set up two-way binding: we input something into the input field and it updates in the form
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            // we create a copy of the orderForm object to not change the original one
            ...this.state.orderForm
        };
        // because we have nested objects in the orderForm, they won't get copied deeply = if we make changes to some of the nested elements, we are still mutating the originals, they are not copies
        // we therefore use the spread operator one more time to make copies of the nested elements as well = we cloned it deeply
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        // here we set the value of updatedFormElement to value of the user input
        updatedFormElement.value = event.target.value;
        // we want to update the valid value; we pass two args to checkValidity - the value from the user input, and the rule from the object
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // once user typed something, we set touched to true
        updatedFormElement.touched = true;
        // we access the inputIdentifier in the updatedOrderForm and set it to the updatedFormElement
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        // we are looping through all the elements in the form
        for (let inputIdentifier in updatedOrderForm) {
            // if that given element is true && is the form valid true - only if both are true, formIsValid will be updated to true
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        // formIsValid - left side refers to the property set up in the state, right side refers to the variable set up a few lines above
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    // we set up a spinner first when it's loading, then the form
    render() {

        const formElementsArray = [];
        // we covert the oderForm object into an array
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        // if we did not set up a validation on an input, this will be false - the red class will therefore not be implemented on it
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        // the id here is the key from out objects
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                {/* if the form is not valid this button should be disabled */}
                <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className='ContactData' >
                <h4>Contact Information</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    };
};

export default connect(mapStateToProp, mapDispatchToProps)(withErrorHandler(ContactData, axios ));