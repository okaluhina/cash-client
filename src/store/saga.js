import { spawn } from 'redux-saga/effects';
import { mainSaga } from './main/sagas';

export default function*() {
  yield spawn(mainSaga);
}
