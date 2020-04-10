import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', display: 'Fastest' },
                        { value: 'cheapest', display: 'Cheapest' }
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        // we don't want to send the request because it reloads our form
        event.preventDefault();
        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            // in a real app this would not be the actual set up - we would recalculate the price on the server
            price: this.props.price,
            // here we just pass some dummy data

        }
        // this is the url that gets appended to the base URL; for Firebase to function, we need to add .json as an end point - in a real app it would be something else
        axios.post('/orders.json', order)
            .then(response => {
                // once we have a response, we want to stop loading
                // to close the modal after the response, we set purchasing to false
                this.setState({ loading: false });
                // once we clicked Order we will be redirected back to home page
                this.props.history.push('/');
            })
            .catch(error => {
                // we also want to stop loading if we have an error
                // to close the modal after the response, we set purchasing to false
                this.setState({ loading: false });
            });
    }

    // here we set up two-way binding: we input something into the input field and it updates in the form
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            // we create a copy of the orderForm object to not change the original one
            ...this.state.orderForm
        }
        // because we have nested objects in the orderForm, they won't get copied deeply = if we make changes to some of the nested elements, we are still mutating the originals, they are not copies
        // we therefore use the spread operator one more time to make copies of the nested elements as well = we cloned it deeply
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        // here we set the value of updatedFormElement to value of the user input
        updatedFormElement.value = event.target.value;
        // we access the inputIdentifier in the updatedOrderForm and set it to the updatedFormElement
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });
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
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        // the id here is the key from out objects
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
            </form>
        );
        if (this.state.loading) {
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

export default ContactData;