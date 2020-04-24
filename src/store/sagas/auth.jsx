import {delay} from 'redux-saga';
import {put} from 'redux-saga/effects';

import * as actions from '../actions/index';
import { func } from 'prop-types';

// we are doing the same here as we did in the auth LOGOUT action
export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime);
    yield put(actions.logout());
}