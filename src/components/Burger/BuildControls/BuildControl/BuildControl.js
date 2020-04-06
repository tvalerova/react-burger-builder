import React from 'react';

import './BuildControl.css';

const buildControl = (props) => (
    <div className='BuildControl'>
        <div className='Label'>{props.label}</div>
        {/* we created the removed property in BuildControls js */}
        <button className='Less' onClick={props.removed}>Less</button>
        {/* added prop is passed from BuildControls which should trigger the method */}
        <button className='More' onClick={props.added}>More</button>
    </div>
);

export default buildControl;