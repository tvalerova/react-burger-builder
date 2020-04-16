import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS, 
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const auth = (email, password, isSignedUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email, 
            password: password, 
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFX2aTHI1c4exk7g7ecMn8VYOfj_8Pxms';
        if (!isSignedUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDFX2aTHI1c4exk7g7ecMn8VYOfj_8Pxms';
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error));
        });
    };
};

