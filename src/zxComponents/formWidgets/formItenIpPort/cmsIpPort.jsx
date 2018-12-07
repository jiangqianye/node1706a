import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, InputNumber } from 'antd';

const InputGroup = Input.Group;

const FormItem = Form.Item;

export default class Index extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    let value = props.value || {};
    this.state = {
      ipAddress: value.ipAddress || '',
      port: value.port || 0,
      value,
    };
  }

  componentWillReceiveProps(nextProps) {
    //怎么判断是否是空对象 ????????
    if (nextProps.value) {
      let value = nextProps.value;
      this.setState({
        ipAddress: value.ipAddress,
        port: value.port,
        value,
      });
    }
  }
  handleIpAddressChange(e) {
    let ipAddress = e.target.value;
    if ('value' in this.props) {
      this.setState({ ipAddress });
    }
    this.triggerChange({ ipAddress });
  }

  handlePortChange(port) {
    if ('value' in this.props) {
      this.setState({ port });
    }
    this.triggerChange({ port });
  }
  triggerChange(changeValue) {
    if (this.props.onChange) {
      this.props.onChange(Object.assign({}, this.state, changeValue));
    }
  }

  render() {
    const { ipAddress, port } = this.state;
    return (
      <InputGroup>
        <Col span={16}>
          <Input
            placeholder="请输入ip"
            value={ipAddress}
            onChange={this.handleIpAddressChange.bind(this)}
          />
        </Col>
        <Col span={1} style={{ textAlign: 'center' }}>
          :
        </Col>
        <Col span={7}>
          <InputNumber
            placeholder="端口"
            value={port}
            min={1}
            max={65535}
            onChange={this.handlePortChange.bind(this)}
          />
        </Col>
      </InputGroup>
    );
  }
}
