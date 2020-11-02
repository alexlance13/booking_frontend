import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props: any) => {
  const { component: Component, role, user, ...rest } = props;
  return <Route {...rest} render={(props) => (user?.role === role ? <Component {...props} /> : <Redirect to='/' />)} />;
};

function mapStateToProps(state: any) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
