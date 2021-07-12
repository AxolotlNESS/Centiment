import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';

class Navbar extends Component  {
  render() {
    return (
  <nav>
    <ul>
      <li><NavLink to='/'>Home</NavLink></li>
      <li ><NavLink to='/login'>Login</NavLink></li>
    </ul>
  </nav>
    )
  }
};

export default Navbar;