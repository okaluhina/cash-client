import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';
import MainPage from 'containers/MainPage.container';
import SecondPage from 'containers/SecondPage.container';
import PrivateRoute from 'services/HOCs/privateRoute';
import ScrollToTop from 'services/HOCs/ScrollToTop';

const App = () => {
  return (
    <React.StrictMode>
      <ScrollToTop>
        <Switch>
          <PrivateRoute allow path="/" exact component={MainPage} />
          <PrivateRoute allow path="/second" exact component={SecondPage} />
        </Switch>
      </ScrollToTop>
    </React.StrictMode>
  );
};

App.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  requestNotifications: PropTypes.func.isRequired,
  receiveNotifications: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
