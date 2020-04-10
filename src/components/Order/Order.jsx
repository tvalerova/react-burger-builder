import React from 'react';
import './Order.css';

const order = (props) => {

    const ingredients = [];

    // to be able to iterate over the ingredients and get the out of the Firebase object, we need to turn them into an array
    // we could also use the same method as in Burger.js - the keys and reduce methods - but this is simpler
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                // this is the object we are pushing into the ingredients array
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    // now that we have an array we can iterate over it
    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name} >
            {ig.name} ({ig.amount}) </span>
    })

    return (
        <div className='Order'>
            <p>Ingredients: {ingredientOutput} </p>
            {/* convert string to number */}
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)} </strong></p>
        </div>
    );
};

export default order;