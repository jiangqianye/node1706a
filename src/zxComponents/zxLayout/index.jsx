import React, { PureComponent } from 'react';
import {
  //HashRouter,  Route,Switch,  BrowserRouter,
  Link,
  withRouter,
} from 'react-router-dom';
import { Layout, Menu, Icon, Popover } from 'antd';
import './index.less';
import staticData from './staticData';
import ProductModal from './productModal';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Index extends PureComponent {
  static propTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      openKeys: [],
      selectedKeys: [],
      collapsed: false, //默认展开侧边栏
    };
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  componentDidMount() {
    this.initialDatas();
  }
  initialDatas() {
    // match, location,
    const { history } = this.props;
    //获取元数据管理的路由
    let menus = staticData.beta1Menu;

    let allfirstMenus = [];
    let allMenus = [];
    menus.forEach(item => {
      let parentKey = item.path + '_' + item.name;
      allfirstMenus.push({ key: parentKey });

      if (Array.isArray(item.children) && item.children.length > 0) {
        item.children.forEach(child => {
          let childKey = child.path + '_' + child.name;
          allMenus.push({ key: childKey, parentKey });

          if (Array.isArray(child.children) && child.children.length > 0) {
            child.children.forEach(nextChild => {
              let nextChildKey = nextChild.path + '_' + nextChild.name;
              allMenus.push({ key: nextChildKey, parentKey });
            });
          }
        });
      }
    });

    let activeMenu = allMenus.filter(item => {
      return (
        item.key.split('_')[0].toLocaleLowerCase() === window.location.pathname.toLocaleLowerCase()
      );
    });
    let openKeys = [];
    let selectedKeys = [];
    if (activeMenu.length > 0) {
      selectedKeys = [activeMenu[0].key];
      openKeys = [
        allfirstMenus.filter(item => {
          return item.key === activeMenu[0].parentKey;
        })[0].key,
      ];
    } else {
      selectedKeys = [menus[0].path + '_' + menus[0].name];
      history.push(menus[0].path);
    }
    this.setState({
      menus,
      selectedKeys,
      openKeys,
    });
  }
  //菜单选中事件
  handleSelectmenu(item) {
    this.setState({ selectedKeys: item.selectedKeys });
  }
  //侧边栏 展开关闭事件
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
      openKeys: [],
    });
  }
  //submenu事件
  onOpenChange(openKeys) {
    this.setState({ openKeys: [openKeys.pop()] });
  }

  //渲染侧边栏
  renderSiderMenu(datas) {
    let doms = [];
    if (Array.isArray(datas) && datas.length > 0) {
      datas.forEach(item => {
        if (Array.isArray(item.children)) {
          if (item.children.length === 0) {
            doms.push(
              <Menu.Item key={item.path + '_' + item.name}>
                <Link to={item.path}>
                  <Icon type={item.icon} />
                  <span> {item.name}</span>
                </Link>
              </Menu.Item>
            );
          } else {
            let subdoms = [];
            item.children.forEach(childItem => {
              subdoms.push(
                <Menu.Item key={childItem.path + '_' + childItem.name}>
                  <Link to={childItem.path}>{childItem.name}</Link>
                </Menu.Item>
              );
            });
            let newsubDoms = (
              <SubMenu
                key={item.path + '_' + item.name}
                title={
                  <span>
                    <Icon type={item.icon} />
                    <span>{item.name}</span>
                  </span>
                }
              >
                {subdoms}
              </SubMenu>
            );
            doms.push(newsubDoms);
          } //else
        } // if (Array.isArray(item.children))
      });
    }
    return doms;
  }
  render() {
    // menu-unfold  menu-fold
    const { selectedKeys, menus } = this.state;

    const content0 = (
      <div>
        <p>Content0</p>
        <p>Content0</p>
      </div>
    );
    const content1 = (
      <div>
        <p>Content1</p>
        <p>Content1</p>
      </div>
    );
    const content2 = (
      <div>
        <p>Content2</p>
        <p>Content2</p>
      </div>
    );
    return (
      <Layout>
        <Header className="zxLayout-header">
          <div className="zxLayout-headerLeft">
            <div className="zxLayout-slideBtn">
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle.bind(this)}
              />
            </div>
            <div className="zxLayout-logo">logo</div>
            <div className="zxLayout-open_products_btn">
              <ProductModal />
            </div>
          </div>

          <div className="zxLayout-headerRight">
            <Popover placement="bottomLeft" content={content0} trigger="click">
              <div className="zxLayout-notification-icon">
                <span>
                  <Icon type="notification" style={{ fontSize: 18, color: 'white' }} />故障
                </span>
              </div>
            </Popover>

            <Popover placement="bottomLeft" content={content1} trigger="click">
              <div className="zxLayout-user-icon">
                <Icon type="user" style={{ fontSize: 18, color: 'white' }} />
              </div>
            </Popover>

            <Popover placement="bottomLeft" content={content2} trigger="click">
              <div className="zxLayout-help-icon">
                <Icon type="question" style={{ fontSize: 18, color: 'white' }} />
              </div>
            </Popover>

            <Popover placement="bottomLeft" content={content2} trigger="click">
              <div className="zxLayout-help-icon">
                <Icon type="question" style={{ fontSize: 18, color: 'white' }} />
              </div>
            </Popover>
          </div>
        </Header>
        <Layout>
          <Sider
            className="zxLayout-sider"
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <Menu
              theme="dark"
              mode="inline"
              onSelect={this.handleSelectmenu.bind(this)}
              selectedKeys={selectedKeys}
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              style={{ height: '100%', borderRight: 0 }}
            >
              {this.renderSiderMenu(menus)}
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ height: '100%', padding: '0 24px 24px' }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
const selfIndex = withRouter(Index);
export default selfIndex;
