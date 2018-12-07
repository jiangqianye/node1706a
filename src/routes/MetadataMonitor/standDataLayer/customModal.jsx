import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import StandardTable from 'components/StandardTable';

class Index extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    btnName: PropTypes.string,
  };
  static defaultProps = {
    title: '标题',
    btnName: '点击按钮弹出模态框',
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  componentDidMount() {}
  showModal = () => {
    const { dispatch, tableKey } = this.props;
    this.setState({
      visible: true,
    });
    dispatch({
      type: 'standDataLayer/fetchDetail',
      payload: { tableKey },
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const { title, btnName } = this.props;
    const { detailData } = this.props.standDataLayer;
    const columns = [
      { title: '字段名称', dataIndex: 'fieldName', key: 'fieldName' },
      { title: '中文名', dataIndex: 'cName', key: 'cName' },
      { title: '字段类型', dataIndex: 'fieldType', key: 'fieldType' },
      { title: '是否为空', dataIndex: 'isNull', key: 'isNull' },
      { title: '关联', dataIndex: 'relative', key: 'relative' },
    ];
    return (
      <div>
        <a onClick={this.showModal}>{btnName}</a>
        <Modal
          title={title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          confirmLoading={false}
          maskClosable={false}
          width={600}
        >
          <StandardTable
            loading={false}
            data={detailData}
            columns={columns}
            hasRowSelection={false}
          />
        </Modal>
      </div>
    );
  }
}
export default Index;
