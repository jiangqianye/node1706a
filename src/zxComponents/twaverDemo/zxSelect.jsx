import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
const Option = Select.Option;
export default class Index extends Component {
  static propTypes = {
    options: PropTypes.array,
  };
  static defaultProps = {
    options: [],
  };
  renderOptions(datas) {
    let doms = [];
    datas.forEach(item => {
      doms.push(
        <Option value={item.value} disabled={item.disabled}>
          {item.name}
        </Option>
      );
    });
    return doms;
  }
  handleChange(value) {
    if (this.props.handleChange) {
      this.props.handleChange(value);
    }
  }

  render() {
    const { options } = this.props;
    return (
      <Select
        defaultValue={options[0].value}
        style={{ width: 120 }}
        onChange={this.handleChange.bind(this)}
      >
        {this.renderOptions(options)}
      </Select>
    );
  }
}
