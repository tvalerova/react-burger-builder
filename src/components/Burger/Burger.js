import React from 'react';

import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // we change the ingredients from an object to an array, so we can iterate over them
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            // we map the object into an array of ingredients
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key = { igKey + i }
                type = { igKey }
                />;
            });
        })
        // we flatten the array with reduce - right now we have an array of arrays
        // it receives 2 args - previous and current value
        .reduce((arr, el) => {
            // it will loop through the elements and add them to the initial value
            return arr.concat(el)
        }, []);

    // if no ingredients have been added, we display this message
    if (transformedIngredients.length === 0) {
        transformedIngredients = < p > Please start adding ingredients! < /p>;
    }
    return ( 
        <div className = 'Burger' >
        <BurgerIngredient type = "bread-top" / > { transformedIngredients } 
        <BurgerIngredient type = "bread-bottom" / >
        </div>
    );
};

export default burger;