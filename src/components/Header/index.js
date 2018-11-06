import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import food from '../../images/food.jpg';

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
    <div className="flex">
      <h1 className="h1">my recipes</h1>
      <span style={{ margin: '50px 10px' }}>
        <img
          src={food}
          alt="food logo"
          className="circle"
          style={{ width: 80 }}
        />
      </span>
    </div>
    <nav className="mt4">
      <HeaderLink to="/">Home</HeaderLink>
      <HeaderLink to="/favorites">Favorites</HeaderLink>
    </nav>
  </header>
);

HeaderLink.propTypes = {
  children: PropTypes.node.isRequired,
};
