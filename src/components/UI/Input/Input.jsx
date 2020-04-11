import React from 'react';
import './Input.css';

const input = (props) => {

    let inputElement = null;

    const inputClasses = ['InputElement'];

    // we can add an error message conditionally
    let validationError = null;

    // if the input is not valid, we will add a new class to our classes array
    // we only want to make the class invalid if the user started typing into the field - otherwise everything is red right away
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid');
        // if input is not valid, we will see this error message
        validationError = <p>Please enter a valid value</p>;
    }

    // we create the form inputs dynamically
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {/* we output the options in the dropdown menu dynamically */}
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className='Input' >
            <label className='Label' >{props.label}</label>
            {inputElement}
            {/* output error message - condition set on top in this file */}
            {validationError}
        </div>
    );
};

export default input;