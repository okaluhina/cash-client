import { call, put, takeLatest } from 'redux-saga/effects';
import api from 'services/api';
import actions from './actions';

const {
  Types: { LOAD_INFO_REQUEST, LOAD_SECOND_REQUEST, SAVE_SECOND_REQUEST },
  Creators: {
    loadInfoSuccess,
    loadInfoFailure,
    loadSecondSuccess,
    loadSecondFailure,
    saveSecondSuccess,
    saveSecondFailure,
  },
} = actions;

function* loadInfo() {
  try {
    const { data } = yield call(api.get, 'main');

    yield put(loadInfoSuccess(data.info));
  } catch (error) {
    yield put(loadInfoFailure('Failed to load Visits.'));
  }
}

function* loadSecond() {
  try {
    const { data } = yield call(api.get, 'second');

    yield put(loadSecondSuccess(data.second));
  } catch (error) {
    yield put(loadSecondFailure('Failed to load Second.'));
  }
}

function* saveSecond({ payload }) {
  try {
    console.log('payload');
    console.log(payload);

    const { data } = yield call(api.post, 'second', { second: payload });

    yield put(saveSecondSuccess(data.second));
  } catch (error) {
    yield put(saveSecondFailure('Failed to save second.'));
  }
}

export function* mainSaga() {
  yield takeLatest(LOAD_INFO_REQUEST, loadInfo);
  yield takeLatest(LOAD_SECOND_REQUEST, loadSecond);
  yield takeLatest(SAVE_SECOND_REQUEST, saveSecond);
}
