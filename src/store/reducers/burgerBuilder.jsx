import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    // we copied this from burgerbuilder
    // we set the ingredients to null again because we are fetching them from firebase again
    ingredients: null,
    // base price for a burger regardless of the ingredients is 4 
    totalPrice: 4,
    error: false
};

// capital letters - they will be used as global constants
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
            const updatedIngs = updateObject(state.ingredients, updatedIngredient);
            const updatedSt = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState);
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients: action.ingredients,
                // right now we fetch our ingredients from firebase which will sort them alphavetically
                // if we want to change the order of the we could do it this way
                // ingredients: {
                //     salad: action.ingredients.salad,
                //     bacon: action.ingredients.bacon,
                //     cheese: action.ingredients.cheese,
                //     meat: action.ingredients.meat
                // },
                totalPrice: 4,
                error: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
};

export default reducer;