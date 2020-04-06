import React from 'react';

import './Modal.css';

// the modal will be a component that can be wrapped around any content
const modal = (props) => (
    <div className='Modal'>
        {props.children}
    </div>
);

export default modal;