import React, { Fragment } from 'react';

import Nav from './Nav.js';
import Footer from './Footer.js';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Nav />
        {children}
      <Footer />
    </Fragment>
  );
};

export default Layout;