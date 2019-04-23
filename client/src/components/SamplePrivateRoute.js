import React from 'react';
import Layout from './Layout.js';

const SamplePrivateRoute = ({ user }) => {
  return (
    <Layout>
      {user.displayName}
    </Layout>
  );
};

export default SamplePrivateRoute;