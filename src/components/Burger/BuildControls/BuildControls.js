import React from 'react';
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className = 'BuildControls'>
        {/* to only show 2 decimals in the price, we use the toFixed method */}
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label} 
            // we have access to types because we are looping through controls
            added={() => props.ingredientAdded(ctrl.type)} 
            // we use the method the property we defined in BurgerBuilder js
            removed={() => props.ingredientRemoved(ctrl.type)} 
            disabled={props.disabled[ctrl.type]}
            />
        ))}
    </div>
);

export default buildControls;