import * as actionTypes from './actionTypes';

// we name our action creators the same as the identifiers, only in cameCase
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

// sync function created
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    };
};

export const initIngredients = () => {
    // this syntax is available thanks to redux thunk
    return dispatch => {

    }
}