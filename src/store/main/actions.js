import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  loadInfoRequest: [],
  loadInfoSuccess: ['payload'],
  loadInfoFailure: ['error'],
});

const Actions = {
  Types,
  Creators,
};

export default Actions;
