import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { logger } from 'redux-logger';
import history from './history';

import rootReducer from './reducer';
import rootSaga from './saga';

const getInitialState = () => {
  return {};
};

const initialState = getInitialState();

const sagaMiddleware = createSagaMiddleware();

const middleWare =
  process.env.NODE_ENV !== 'production'
    ? [logger, routerMiddleware(history), sagaMiddleware]
    : [routerMiddleware(history), sagaMiddleware];

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);

sagaMiddleware.run(rootSaga);
export default store;
