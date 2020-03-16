import { createReducer } from 'reduxsauce';
import actions from './actions';

const { Types } = actions;
const INITIAL_STATE = {
  info: [],
  second: '',
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



const loadSecondRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    error: null,
  };
};

const loadSecondSuccess = (state = INITIAL_STATE, { payload }) => {
  return {
    ...state,
    error: null,
    second: payload,
  };
};

const loadSecondFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    error,
  };
};


const saveSecondRequest = (state = INITIAL_STATE, {payload}) => {
  return {
    ...state,
    error: null,
  };
};

const saveSecondSuccess = (state = INITIAL_STATE, { payload }) => {
  return {
    ...state,
    error: null,
    second: payload,
  };
};

const saveSecondFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    error,
  };
};



export const HANDLERS = {
  [Types.LOAD_INFO_REQUEST]: loadInfoRequest,
  [Types.LOAD_INFO_SUCCESS]: loadInfoSuccess,
  [Types.LOAD_INFO_FAILURE]: loadInfoFailure,

  [Types.LOAD_SECOND_REQUEST]: loadSecondRequest,
  [Types.LOAD_SECOND_SUCCESS]: loadSecondSuccess,
  [Types.LOAD_SECOND_FAILURE]: loadSecondFailure,

  [Types.SAVE_SECOND_REQUEST]: saveSecondRequest,
  [Types.SAVE_SECOND_SUCCESS]: saveSecondSuccess,
  [Types.SAVE_SECOND_FAILURE]: saveSecondFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
