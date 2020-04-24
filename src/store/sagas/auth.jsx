import {put} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

// we are doing the same here as we did in the auth LOGOUT action
function* logout(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put({
        type: actionTypes.AUTH_LOGOUT
    });
};