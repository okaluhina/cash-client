import { createReducer } from 'reduxsauce';
import actions from './actions';

const { Types } = actions;
const INITIAL_STATE = {
  info: [],
  error: null,
};

const loadInfoRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    error: null,
  };
};

const loadInfoSuccess = (state = INITIAL_STATE, { payload }) => {
  return {
    ...state,
    error: null,
    info: payload,
  };
};

const loadInfoFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    error,
  };
};

export const HANDLERS = {
  [Types.LOAD_INFO_REQUEST]: loadInfoRequest,
  [Types.LOAD_INFO_SUCCESS]: loadInfoSuccess,
  [Types.LOAD_INFO_FAILURE]: loadInfoFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
