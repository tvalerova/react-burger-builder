import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

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
        },
        isSignedUp: true
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignedUp: !prevState.isSignedUp };
        });
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
            <div className='Auth' >
                <form onSubmit={this.submitHandler} >
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType='Danger'>{this.state.isSignedUp ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    };
};

export default connect(null, mapDispatchToProps)(Auth);