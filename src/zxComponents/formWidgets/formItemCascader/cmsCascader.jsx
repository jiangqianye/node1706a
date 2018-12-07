import React, { Component } from 'react';
import { Cascader } from 'antd';

export default class Index extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || [],
      options: props.options || [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.value && this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
    //怎么判断 数组的值不相等(比较引用类型的值????)
    if (this.props.options && this.props.options !== nextProps.options) {
      this.setState({ value: nextProps.value });
    }
  }
  onChange(value) {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    const { options, value } = this.state;

    return (
      <Cascader
        {...this.props}
        allowClear={false}
        options={options}
        value={value}
        onChange={this.onChange.bind(this)}
        placeholder="请选择"
      />
    );
  }
}
