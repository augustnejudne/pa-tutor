import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './authRoutes/PrivateRoute';
import PublicRoute from './authRoutes/PublicRoute';

import Landing from './components/Landing/Landing.js';
import SamplePublicRoute from './components/SamplePublicRoute.js';
// import SamplePrivateRoute from './components/SamplePrivateRoute.js';
import Dashboard from './components/dashboard/Dashboard.js';
import EditProfile from './components/dashboard/EditProfile.js';
import UserProfile from './components/dashboard/UserProfile.js';
import Page404 from './components/Page404.js';

const Routes = props => {
  return (
    <Switch>
      <PrivateRoute {...props} exact component={Dashboard} path="/" />
      <PrivateRoute {...props} exact component={UserProfile} path="/tutor/:uid" />
      <PrivateRoute {...props} exact component={EditProfile} path="/edit-profile" />
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
        component={Landing}
        path="/login"
        restricted={false}
      />
      <PublicRoute {...props} component={Page404} />
    </Switch>
  );
};

export default Routes;
