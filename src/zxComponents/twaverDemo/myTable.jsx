import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Tabs, Select, Input } from 'antd';
import CmsTable from '../cmsTable';
import ZxSelect from './zxSelect';
const TabPane = Tabs.TabPane;

export default class Index extends Component {
  static propTypes = {
    //prop: PropTypes
  };

  callback(key) {
    console.log(key);
  }

  render() {
    const filterGongOptions = [
      { value: '<=', name: '<=' },
      { value: '<>', name: '<>' },
      { value: '>=', name: '>=' },
      { value: 'like', name: 'like' },
      { value: 'not like', name: 'not like' },
      { value: 'not in', name: 'not in' },
      { value: 'in', name: 'in' },
    ];
    const filterValueOptions = [
      { value: '=', name: '=' },
      { value: '>', name: '>' },
      { value: '<', name: '<' },
      { value: '>=', name: '>=' },
      { value: '<=', name: '<=' },
      { value: '<>', name: '<>' },
      { value: 'like', name: 'like' },
    ];
    const operatores = [{ value: 'and', name: 'and' }, { value: 'or', name: 'or' }];
    const columns = [
      { title: '目标字段', dataIndex: 'target', key: 'target', width: 100 },
      { title: '原字段', dataIndex: 'source', key: 'source', width: 100 },
      { title: '原表', dataIndex: 'sourceTable', key: 'sourceTable' },
      {
        title: '筛选公式',
        dataIndex: 'filterGong',
        key: 'filterGong',
        render: text => <ZxSelect options={filterGongOptions} />,
      },
      {
        title: '筛选值',
        dataIndex: 'filterValue',
        key: 'filterValue',
        render: text => <ZxSelect options={filterValueOptions} />,
      },
      {
        title: '逻辑运算符',
        dataIndex: 'operator',
        key: 'operator',
        render: text => <ZxSelect options={operatores} />,
      },
      {
        title: '默认值',
        dataIndex: 'defaultValue',
        key: 'defaultValue',
        render: text => <Input placeHolder="默认值" />,
      },
    ];
    const { dataSource } = this.props;
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
          <TabPane tab="字段选择" key="1">
            <CmsTable columns={columns} dataSource={dataSource} />
          </TabPane>
          <TabPane tab="SQL语句" key="2">
            <Input placeholder="请输入SQL语句" />
          </TabPane>
          <TabPane tab="原表关联" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
