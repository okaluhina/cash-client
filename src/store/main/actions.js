import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  loadInfoRequest: [],
  loadInfoSuccess: ['payload'],
  loadInfoFailure: ['error'],

  loadSecondRequest: [],
  loadSecondSuccess: ['payload'],
  loadSecondFailure: ['error'],

  saveSecondRequest: ['payload'],
  saveSecondSuccess: ['payload'],
  saveSecondFailure: ['error'],
});

const Actions = {
  Types,
  Creators,
};

export default Actions;
