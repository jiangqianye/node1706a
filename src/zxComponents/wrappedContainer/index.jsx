import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ZxTable } from '../index';

const WrappedContainer = WrappedComponent => {
  class Index extends Component {
    static propTypes = {
      title: PropTypes.string,
      description: PropTypes.string,
      tableTitle: PropTypes.string, // 表格标题
      isRowSelection: PropTypes.bool, // 是否有表格复选框
      columns: PropTypes.array.isRequired,
      dataSource: PropTypes.array,
      hasTable: PropTypes.bool,
      selectedRowKeys: PropTypes.array,
      selectedRows: PropTypes.array,
      current: PropTypes.number,
      pageSize: PropTypes.number,
      total: PropTypes.number,
    };
    static defaultProps = {
      title: '标题',
      description: '标题描述',
      tableTitle: null,
      isRowSelection: true,
      // columns: [{ title: '名称', dataIndex: 'name', key: 'name', }],
      hasTable: true,
      dataSource: [],
      selectedRowKeys: [],
      selectedRows: [],
      current: 1,
      pageSize: 10,
      total: 0,
    };
    constructor(props) {
      super(props);

      this.state = {
        selectedRowKeys: props.selectedRowKeys,
        selectedRows: props.selectedRows,
      };
      this.searchs = {
        current: 1,
        pageSize: 10,
        searchValue: '',
      };
    }

    componentDidMount() {}

    // 分页
    onPaginationChange(current, pageSize) {
      this.onChange({ current, pageSize });
    }
    // 选中复选框事件
    onSelectChange = (selectedRowKeys, selectedRows) => {
      this.setState({ selectedRowKeys, selectedRows });
    };
    onChange(datas) {
      this.searchs = Object.assign({}, this.searchs, datas);
    }
    // 搜索
    handleSearch(searchValue) {
      this.onChange({ searchValue });
    }
    //
    handleOperateChange() {}

    render() {
      const { selectedRowKeys, selectedRows } = this.state;
      const { columns, isRowSelection, dataSource, current, pageSize, total } = this.props;

      const rowSelection = {
        selectedRowKeys,
        selectedRows,
        onChange: this.onSelectChange.bind(this),
      };

      return (
        <div>
          {/* 自定义操作栏 */}
          <WrappedComponent
            {...this.props}
            handleSearch={this.handleSearch.bind(this)}
            selectedRowKeys={selectedRowKeys}
            selectedRows={selectedRows}
            handleOperateChange={this.handleOperateChange.bind(this)}
          />

          {this.props.hasTable ? (
            <ZxTable
              columns={columns}
              dataSource={dataSource}
              current={current}
              pageSize={pageSize}
              total={total}
              onPaginationChange={this.onPaginationChange.bind(this)}
              pagination
              bordered
              handleRowClick={this.props.handleRowClick}
              scroll={this.props.scroll}
              // title={() => tableTitle ? tableTitle : null}
              rowSelection={isRowSelection ? rowSelection : null}
            />
          ) : null}
        </div>
      );
    }
  }
  return Index;
};
export default WrappedContainer;
