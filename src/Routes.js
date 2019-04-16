import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './authRoutes/PrivateRoute';
import PublicRoute from './authRoutes/PublicRoute';

import Home from './components/Home.js';
import SamplePublicRoute from './components/SamplePublicRoute.js';
import SamplePrivateRoute from './components/SamplePrivateRoute.js';
import Page404 from './components/Page404.js';

const Routes = props => {
  return (
    <Switch>
      <PrivateRoute {...props} exact component={SamplePrivateRoute} path="/sample-private" />
      <PublicRoute
        {...props}
        exact
        component={SamplePublicRoute}
        path="/sample-public"
        restricted={false}
      />
      <PublicRoute
        {...props}
        exact
        component={Home}
        path="/"
        restricted={false}
      />
      <PublicRoute {...props} component={Page404} />
    </Switch>
  );
};

export default Routes;
