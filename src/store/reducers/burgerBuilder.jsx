import * as actionTypes from '../actions/actionTypes';

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
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    // a special syntax to dynamically overwrite a property in a given JS object
                    // the square brackets do not create an array here - we pass it a vaariable or something which contains the name we actually want to use as a property name
                    // we expect to get the property on the action, and call it ingredientName
                    // ingredient name is something we get as payload to the action
                    // in here we will receive the new value for an ingredient

                    // we fetch the old state and add 1, and we overwrite the old state with the updated value
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients: action.ingredients,
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