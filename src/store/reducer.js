import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import main from './main/reducers';
import history from './history';

const reducers = {
  router: connectRouter(history),
  main,
};

export default combineReducers(reducers);
