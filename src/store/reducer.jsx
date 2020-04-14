import * as actionTypes from './actions';

const initialState = {
    // we copied this from burgerbuilder
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
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
                }
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }
            };
        default:
            return state;
    }
};

export default reducer;