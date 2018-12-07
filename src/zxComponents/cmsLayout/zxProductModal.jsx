import React, { Component } from 'react';
import {
  Modal,
  Icon,
  Card,
  Tooltip,
  // Col, Row,
} from 'antd';
import './index.less';

const moduleDatas = [
  { code: '1', name: 'API Manager', isDefault: false, type: 'Integration Cloud', isEnable: true },
  {
    code: '2',
    name: 'Application Integration',
    isDefault: false,
    type: 'Integration Cloud',
    isEnable: true,
  },
  {
    code: '3',
    name: 'Data Integration',
    isDefault: false,
    type: 'Integration Cloud',
    isEnable: true,
  },
  {
    code: '4',
    name: 'Application Integration Console',
    isDefault: false,
    type: 'Integration Cloud',
    isEnable: true,
  },
  {
    code: '5',
    name: 'PC to Cloud Conversion',
    isDefault: false,
    type: 'Integration Cloud',
    isEnable: false,
  },

  { code: '6', name: 'Administrator', isDefault: false, type: 'Common Services', isEnable: true },
  { code: '7', name: 'Monitor', isDefault: false, type: 'Common Services', isEnable: true },
  { code: '8', name: 'Operate', isDefault: false, type: 'Common Services', isEnable: false },
  {
    code: '9',
    name: 'Operational Insights',
    isDefault: false,
    type: 'Common Services',
    isEnable: false,
  },
];

export default class CheckModule extends Component {
  state = {
    visible: false,
    loading: false,
  };
  showModal() {
    this.setState({
      visible: true,
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
  renderProduce(datas) {
    let doms = [];
    datas.forEach(item => {
      doms.push(
        <div className="product-cell" key={item.code}>
          <div className="default-corner">
            <span className="default-check-img">
              {' '}
              <Icon type="check-circle" />
            </span>
            <span className="set-default-text"> Set as Default</span>
          </div>
          <div className="product-name">{item.name}</div>
          <Tooltip title="prompt text" placement="bottomRight">
            <div className="info-container" />
          </Tooltip>
        </div>
      );
    });
    return doms;
  }
  render() {
    const { loading } = this.state;
    return (
      <div>
        <span onClick={this.showModal.bind(this)}>
          {' '}
          Administrator <Icon type="down" />
        </span>

        <Modal
          title={
            <div className="products-header">
              <span className="common-indexHeaderImage" />
              <span className="title">Intelligent Cloud Services</span>
            </div>
          }
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          //footer={null}
          maskClosable={false}
          confirmLoading={loading}
          width={840}
          destroyOnClose={true}
        >
          <div className="products-services-type-title">My Services</div>
          <Card>
            <div className="product-row">{this.renderProduce(moduleDatas)}</div>
          </Card>
        </Modal>
      </div>
    );
  }
}
