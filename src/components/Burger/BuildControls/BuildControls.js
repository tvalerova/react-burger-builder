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
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label} 
            // we have access to types because we are looping through controls
            added={() => props.ingredientAdded(ctrl.type)} 
            // we use the method the property we defined in BurgerBuilder js
            removed={() => props.ingredientRemoved(ctrl.type)} 
            />
        ))}
    </div>
);

export default buildControls;