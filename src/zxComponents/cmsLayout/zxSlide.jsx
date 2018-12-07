import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import {
  //HashRouter,  Route,Switch,  BrowserRouter,

  Link,
  withRouter,
} from 'react-router-dom';

import './index.less';

import staticData from './staticData';
const {
  //Header,  Footer,
  Content,
  Sider,
} = Layout;

class ZxSlide extends Component {
  static propTypes = {
    collapsed: PropTypes.bool,
  };
  static defaultProps = {
    collapsed: true,
  };
  constructor(props) {
    super(props);
  }
  state = {
    menus: [],
    selectedmenu: ['1'],
  };

  componentDidMount() {
    //获取元数据管理的路由
    let menus = staticData.slideData.metadata_management;
    let activeMenu = menus.filter(
      item => item.link.toLocaleLowerCase() === window.location.pathname.toLocaleLowerCase()
    );
    let selectedmenu = [];
    if (activeMenu.length > 0) {
      selectedmenu = [activeMenu[0].code];
    } else {
      selectedmenu = [menus[0].code];
      this.props.history.push(menus[0].link);
    }
    this.setState({
      menus,
      selectedmenu,
    });
  }

  //渲染左侧菜单
  renderMenu(datas) {
    let doms = [];
    //{item.icon ? <img src={item.icon} style={{ width: '20px', height: '20px' }} /> : null}
    if (Array.isArray(datas) && datas.length > 0) {
      datas.forEach(item => {
        doms.push(
          <Menu.Item key={item.code}>
            <Link to={item.link}>
              <Icon type="desktop" />
              <span> {item.cName}</span>
            </Link>
          </Menu.Item>
        );
      });
    }
    return doms;
  }
  handleSelectmenu(item) {
    this.setState({ selectedmenu: item.selectedKeys });
  }
  render() {
    const { collapsed } = this.props;
    const { selectedmenu, menus } = this.state;
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu
            theme="dark"
            mode="inline"
            onSelect={this.handleSelectmenu.bind(this)}
            selectedKeys={selectedmenu}
          >
            {this.renderMenu(menus)}
          </Menu>
        </Sider>
        <Layout>
          <Content>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(ZxSlide);
