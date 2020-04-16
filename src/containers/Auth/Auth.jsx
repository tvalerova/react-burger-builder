import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            },
        }
    }

    render() {
        const formElementsArray = [];
        // we covert the oderForm object into an array
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement => (
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
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        return (
            <div>
                <form>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
            </div>
        )
    }
}

export default Auth;