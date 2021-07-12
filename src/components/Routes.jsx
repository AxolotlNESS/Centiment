import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Team from './pages/Team.js';


class Routes extends Component  {
  render() {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      {/* <Route exact path='/Team' component={Team}></Route> */}
    </Switch>
  );
  }
}

export default Routes;