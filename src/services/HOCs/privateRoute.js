import { Route, withRouter, Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import history from '../../store/history';

const PrivateRoute = ({
  path,
  component: Component,
  allow,
  redirectTo,
  requiresAccount,
  currentAccount,
  ...rest
}) => {
  let callback;
  const setCallback = cb => sessionStorage.setItem('callback', cb);

  history.location.state = { ...history.location.state };

  if (redirectTo === '/')
    callback = history.location.pathname ? history.location.pathname : null;

  useEffect(() => {
    if (callback) setCallback(callback);
  }, [callback]);

  // 403 page is rendering when user is logged in but access is not allowed
  // By passing "redirectTo" prop you can redirect user to specific page.
  return (
    <Route
      {...rest}
      render={props => (allow ? <Component {...props} /> : <Redirect to={redirectTo} />)}
    />
  );
};

PrivateRoute.propTypes = {
  forbidden: PropTypes.bool,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  path: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
  allow: PropTypes.bool.isRequired,
  requiresAccount: PropTypes.bool,
  currentAccount: PropTypes.object,
  redirectTo: PropTypes.string,
  pageMeta: PropTypes.object,
};

PrivateRoute.defaultProps = {
  pageMeta: {},
  forbidden: false,
  redirectTo: '/',
  requiresAccount: false,
  currentAccount: null,
  history: {
    goBack: () => {
      return null;
    },
  },
};

export default withRouter(PrivateRoute);
