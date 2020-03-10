import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/es/object';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';
import App from 'components/App';
import store from 'store';
import history from 'store/history';
import { checkHttps } from './utils/checkHttps';
import * as serviceWorker from './serviceWorker';
import './index.css';

checkHttps();

const RootApp = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
};
ReactDOM.render(<RootApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
