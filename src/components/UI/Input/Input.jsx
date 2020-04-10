import React from 'react';
import './Input.css';

const input = (props) => {

    let inputElement = null;

    // we create the form inputs dynamically
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className='InputElement'
                {...props.elementConfig}
                value={props.value} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className='InputElement'
                {...props.elementConfig}
                value={props.value} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className='InputElement'
                    value={props.value}>
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
                className='InputElement'
                {...props.elementConfig}
                value={props.value} />;
    }

    return (
        <div className='Input' >
            <label className='Label' >{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;