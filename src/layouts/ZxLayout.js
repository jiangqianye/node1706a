import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { Link, Redirect, Switch, Route } from 'dva/router';
import { getRoutes } from '../utils/utils';

export default class ZxLayout extends Component {
  static propTypes = {};

  render() {
    const { routerData, match } = this.props;
    return (
      <div>
        <h1>新的布局</h1>
        <div>
          <Switch>
            {getRoutes(match.path, routerData).map(item => (
              <Route
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ))}
            <Redirect exact from="/user" to="/user/login" />
          </Switch>
        </div>
        <h1>新的布局-------------------</h1>
      </div>
    );
  }
}
