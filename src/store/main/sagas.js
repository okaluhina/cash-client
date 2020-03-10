import { call, put, takeLatest } from 'redux-saga/effects';
import api from 'services/api';
import actions from './actions';

const {
  Types: { LOAD_INFO_REQUEST },
  Creators: { loadInfoSuccess, loadInfoFailure },
} = actions;

function* loadInfo() {
  try {
    const { data } = yield call(api.get, 'main');

    yield put(loadInfoSuccess(data.info));
  } catch (error) {
    yield put(loadInfoFailure('Failed to load Visits.'));
  }
}

export function* mainSaga() {
  yield takeLatest(LOAD_INFO_REQUEST, loadInfo);
}
