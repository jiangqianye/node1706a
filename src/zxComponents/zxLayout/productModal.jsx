import React from 'react';
import { Modal, Icon } from 'antd';

import styles from './index.less';

class ProductModal extends React.Component {
  state = { visible: false, loading: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const { loading } = this.state;
    return (
      <div>
        <span onClick={this.showModal}>
          元数据管理{' '}
          <span>
            <Icon type="down" />
          </span>{' '}
        </span>

        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          confirmLoading={loading}
          maskClosable={false}
        >
          <div className={styles.productModalContainer}>22222222222</div>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default ProductModal;
