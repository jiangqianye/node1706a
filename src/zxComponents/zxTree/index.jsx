import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tree, Input } from 'antd';
import webApi from '../utils/webApi';

const { TreeNode } = Tree;
const { Search } = Input;
/*
树组件---------
是否含复选框， 有则加上事件 将值传到外部
是否含搜索框-----------??
是否可将数据拖动到外部--------??
必须异步加载数据，------------??
自定义图标
*/
class Index extends PureComponent {
  static propTypes = {
    api: PropTypes.string,
  };
  static defaultProps = {
    api: '/api/systemManage/getQuotaTreeData',
  };
  state = {
    treeData: [],
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
  };
  componentDidMount() {
    webApi.get(this.props.api).then(datas => {
      if (Array.isArray(datas)) {
        this.setState({ treeData: datas });
      }
    });
  }

  onExpand = expandedKeys => {
    // console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
    if (this.props.onCheck) {
      this.props.onCheck(checkedKeys);
    }
  };
  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
    if (this.props.onSelect) {
      this.props.onSelect(selectedKeys);
    }
  };

  onLoadData = treeNode => {
    const { children, dataRef } = treeNode.props;
    return new Promise(resolve => {
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        dataRef.children = [
          { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
          { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
        ];
        this.setState({
          treeData: [...this.state.treeData],
        });
        resolve();
      }, 1000);
    });
  };
  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  };
  render() {
    return (
      <Tree
        showLine
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
        // loadData={this.onLoadData}
      >
        {this.renderTreeNodes(this.state.treeData)}
      </Tree>
    );
  }
}
export default Index;
