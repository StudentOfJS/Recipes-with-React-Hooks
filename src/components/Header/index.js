import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const HeaderLink = ({ children, ...props }) => (
  <NavLink
    exact
    className="p1 mx2 black text-decoration-none rounded"
    activeClassName="bg-white"
    to="/"
    {...props}
  >
    {children}
  </NavLink>
);

export default () => (
  <header className="flex align-center justify-between px4">
    <h1 className="h1">my recipes</h1>
    <nav className="mt4">
      <HeaderLink to="/">Home</HeaderLink>
      <HeaderLink to="/favorites">Favorites</HeaderLink>
    </nav>
  </header>
);

HeaderLink.propTypes = {
  children: PropTypes.node.isRequired,
};
