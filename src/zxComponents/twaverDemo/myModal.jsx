import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import StartTwaver from './startTwaver';

export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    //prop: PropTypes
  };
  state = { visible: false };

  componentDidMount() {}
  showModal() {
    this.setState({
      visible: true,
      dataSource: [],
    });
  }

  handleOk(e) {
    this.setState({
      visible: false,
    });
  }
  handleCancel(e) {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal.bind(this)}>
          弹出模态框
        </Button>
        <Modal
          title={'标题'}
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          width={1000}
          maskClosable={false}
        >
          {visible ? <StartTwaver /> : null}
        </Modal>
      </div>
    );
  }
}

/*
  <StartTwaver />
*/
