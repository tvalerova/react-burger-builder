import {put} from 'redux-saga/effects';

import * as actions from '../actions/index';

// we are doing the same here as we did in the auth LOGOUT action
export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
};