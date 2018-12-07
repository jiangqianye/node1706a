import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types'
import { Tree, Icon } from 'antd';

const { TreeNode } = Tree;

export default class MyTree extends PureComponent {
  static propTypes = {};
  state = {
    checkedKeys: this.props.value,
  };
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.value);
  }
  onCheck = checkedKeys => {
    this.props.onChange(checkedKeys);
    this.setState({ checkedKeys });
  };
  render() {
    const { treeData } = this.props;
    const { checkedKeys } = this.state;
    const treeNodeList = (
      <TreeNode icon={<Icon type="folder" />} title="root" key="sgsz">
        {findRoot(treeData)}
      </TreeNode>
    );
    // 先查出根节点
    function findRoot(tree) {
      const nodeStr = tree.map(node => {
        return (
          <TreeNode icon={<Icon type="folder" />} title={node.title} key={node.key}>
            {findChild(node)}
          </TreeNode>
        );
      });
      return nodeStr;
    }
    // 循环递归展开树
    function findChild(node) {
      if (node != null) {
        if (node.child != null) {
          const str = node.child.map(n => {
            return (
              <TreeNode
                icon={n.child ? <Icon type="folder" /> : <Icon type="file" />}
                title={n.title}
                key={n.key}
              >
                {findChild(n)}
              </TreeNode>
            );
          });
          return str;
        }
      }
    }
    return (
      <Tree
        checkable
        defaultExpandAll
        // defaultCheckedKeys={value}
        checkedKeys={checkedKeys}
        onCheck={this.onCheck}
      >
        {treeNodeList}
      </Tree>
    );
  }
}
