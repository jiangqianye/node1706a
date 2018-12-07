import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import CmsPagination from './cmsPagination';

import './index.less';

//将表格与分页组件结合在一起
export default class Index extends Component {
  static propTypes = {
    pagination: PropTypes.bool,
  };
  static defaultProps = {
    pagination: true,
    isHover: true,
    bordered: true,
  };
  constructor(props) {
    super(props);

    this.state = {
      dataSource: props.dataSource || [],
      //通过复选框选中的数据(可以多个)
      selectedRowKeys: props.selectedRowKeys || [],
      //通过鼠标点击的数据(只有一个)
      clickedRowKey: props.clickedRowKey || null,
    };
  }
  componentDidMount() {
    if (Array.isArray(this.props.dataSource)) {
      this.setState({
        dataSource: this.dealDataSource(this.props.dataSource),
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    //判断2个数组的值相等
    if (Array.isArray(nextProps.dataSource)) {
      this.setState({
        dataSource: this.dealDataSource(nextProps.dataSource),
      });
    }
  }

  handleRowClick(record) {
    // if(this.props.handleRowClick){
    //   this.props.handleRowClick(record)
    // }
    // this.setState({
    //   clickedRowKey:record.code
    // })
  }
  //表格行的类名
  handleRowClassName(record, index) {
    if (record.code === this.state.clickedRowKey && this.props.isHover) {
      return 'tableRowColor';
    }
  }
  //分页
  onPaginationChange(index, size) {
    if (this.props.onPaginationChange) {
      this.props.onPaginationChange(index, size);
    }
  }
  dealDataSource(dataSource, clickedRowKey = this.state.clickedRowKey) {
    let newDataSource = dataSource.map(item => {
      let key = item.code ? item.code : item.id;
      if (key === clickedRowKey) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }

      return {
        ...item,
        key,
      };
    });
    return newDataSource;
  }

  render() {
    const { dataSource } = this.state;
    const {
      rowSelection,
      columns,
      loading,
      rowClassName,
      rowKey,
      scroll,
      size,
      title,
      bordered,

      current,
      pageSize,
      pageSizeOptions,
      showQuickJumper,
      total,
      onPaginationChange,
      //是否显示分页
      pagination,
    } = this.props;
    const tableProps = {
      bordered,
      rowSelection,
      columns,
      dataSource,
      loading,
      rowClassName,
      rowKey: rowKey ? rowKey : 'code',
      scroll,
      size: size ? size : 'small',
      title,
    };

    const paginationProps = {
      current,
      pageSize,
      pageSizeOptions,
      showQuickJumper,
      total,
      onPaginationChange,
    };
    return (
      <div style={{ background: '#fff', padding: 0, margin: 0 }}>
        <Table
          {...tableProps}
          pagination={false}
          onRow={record => ({
            onClick: () => this.handleRowClick(record),
            onDoubleClick: () => {},
            onContextMenu: () => {},
            onMouseEnter: () => {},
            onMouseLeave: () => {},
          })}
          rowClassName={this.handleRowClassName.bind(this)}
        />
        {pagination ? (
          <div style={{ marginBottom: '30px', marginTop: '10px', textAlign: 'right' }}>
            <CmsPagination
              {...paginationProps}
              onPaginationChange={this.onPaginationChange.bind(this)}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
