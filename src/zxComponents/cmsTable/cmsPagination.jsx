import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

/*

封装了Pagination的onChange onShowSizeChange方法使外部只需一个方法就可以获取页码和分页大小

*/
export default class XmPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: props.pageSize,
      current: props.current,
    };
    this.onChange = this.onChange.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.showTotal = this.showTotal.bind(this);
  }

  static defaultProps = {
    showSizeChanger: true,
    pageSize: 10,
    current: 1,
    size: 'small',
    total: 0,
  };

  static propTypes = {
    showSizeChanger: PropTypes.bool,
    pageSize: PropTypes.number,
    current: PropTypes.number,
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.pageSize !== undefined && this.props.pageSize !== nextProps.pageSize) {
      this.setState({ pageSize: nextProps.pageSize });
    }
    if (this.props.current !== undefined && this.props.current !== nextProps.current) {
      this.setState({ current: nextProps.current });
    }
  };

  onChange(page, pageSize) {
    //跳转页数
    console.log(`跳转第${page}页,每页数据${pageSize}条`);
    if (this.props.onPaginationChange) {
      this.props.onPaginationChange(page, pageSize);
    }
    this.setState({
      pageSize,
      current: page,
    });
  }

  onShowSizeChange(current, size) {
    //每页数据量
    console.log(`当前为第${current}页，每页显示数据量为${size}条`);
    if (this.props.onPaginationChange) {
      this.props.onPaginationChange(current, size);
    }
    this.setState({
      current,
      pageSize: size,
    });
  }

  //-----------
  showTotal(total, range) {
    return `共${total}条`;
  }
  render() {
    const { pageSize, current } = this.state;
    return (
      <div style={{ margin: '16px 0', float: 'right' }}>
        <Pagination
          {...this.props}
          pageSize={pageSize}
          current={current}
          onChange={this.onChange}
          size="small"
          onShowSizeChange={this.onShowSizeChange}
          showTotal={this.showTotal}
        />
      </div>
    );
  }
}
