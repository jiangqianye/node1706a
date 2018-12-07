import React, { Component } from 'react';
import {
  Layout,
  //Menu,Icon
} from 'antd';

import {
  //HashRouter,  Route,Switch, withRouter,
  Link,
  BrowserRouter,
} from 'react-router-dom';
import ZxHeader from './zxHeader';
import ZxSlide from './zxSlide';
import './index.less';
//const { Header, Content, Sider, Footer} = Layout;

export default class Index extends Component {
  state = {
    collapsed: false,
    userName: '',
    password: '',
  };

  render() {
    const { collapsed, userName, password } = this.state;
    return (
      <Layout style={{ height: '100%' }}>
        <ZxHeader toggleSlide={collapsed => this.setState({ collapsed })} />
        <ZxSlide collapsed={collapsed} {...this.props} />
      </Layout>
    );
  }
}
/*

*/
