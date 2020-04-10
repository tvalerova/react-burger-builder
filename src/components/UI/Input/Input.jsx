import React from 'react';
import './Input.css';

const input = (props) => {

    let inputElement = null;

    const inputClasses = ['InputElement'];

    // if the input is not valid, we will add a new class to our classes array
    if (props.invalid) {
        inputClasses.push('Invalid');
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
                            {Option.displayValue}
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
        </div>
    );
};

export default input;