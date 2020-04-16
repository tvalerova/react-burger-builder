import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
    // this is the url that gets appended to the base URL; for Firebase to function, we need to add .json as an end point - in a real app it would be something else
        axios.post('/orders.json', orderData)
            .then(response => {
                // // once we have a response, we want to stop loading
                // // to close the modal after the response, we set purchasing to false
                // this.setState({ loading: false });
                // // once we clicked Order we will be redirected back to home page
                // this.props.history.push('/');
                dispatch(purchaseBurgerSuccess(response.data, orderData));
            })
            .catch(error => {
                // // we also want to stop loading if we have an error
                // // to close the modal after the response, we set purchasing to false
                // this.setState({ loading: false });
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};