import React from 'react';
import './Input.css';

const input = (props) => {

    let inputElement = null;
    
    // we create the form inputs dynamically
    // for some reason in React 16 and higher when we pass inputType, it throws a warning, so we changed it to inputtype
    switch (props.inputtype) {
        case ('input'):
            inputElement = <input className='InputElement' {...props} />;
            break;
        case ('textarea'):
            inputElement = <textarea className='InputElement' {...props} />;
            break;
        default:
            inputElement = <input className='InputElement' {...props} />;
    }

    return (
        <div className='Input' >
            <label className='Label' >{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;