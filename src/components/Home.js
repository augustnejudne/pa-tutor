import React from 'react';
import { Link } from 'react-router-dom';

import Layout from './Layout';

const Home = ({ props }) => {
  return (
    <Layout>
      This is the home page
      <br/>
      <Link to="/sample-private">
        view private route
      </Link>
      <br/>
      <Link to="/sample-public">
        view public route
      </Link>
    </Layout>
  );
};

export default Home;