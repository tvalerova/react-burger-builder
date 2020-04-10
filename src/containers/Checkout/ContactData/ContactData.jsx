import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipcode: ''
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

    // we set up a spinner first when it's loading, then the form
    render() {
        let form = (
            <form>
                <input className='Input' type="text" name="name" placeholder="Your name" />
                <input className='Input' type="email" name="email" placeholder="Your email" />
                <input className='Input' type="text" name="street" placeholder="Street name" />
                <input className='Input' type="text" name="zipcode" placeholder="Zipcode" />
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