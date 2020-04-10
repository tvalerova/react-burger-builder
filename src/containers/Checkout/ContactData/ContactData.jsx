import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipcode: ''
        }
    }

    orderHandler = (event) => {
        // we don't want to send the request because it reloads our form
        event.preventDefault();
        console.log(this.props.ingredients);
    }

    render () {
        return (
            <div className='ContactData' >
                <h4>Contact Information</h4>
                <form>
                    <input className='Input' type="text" name="name" placeholder="Your name" />
                    <input className='Input' type="email" name="email" placeholder="Your email" />
                    <input className='Input' type="text" name="street" placeholder="Street name" />
                    <input className='Input' type="text" name="zipcode" placeholder="Zipcode" />
                    <Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;