import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';
import { FormItemSelect } from '../../../zxComponents';

const FormItem = Form.Item;

class DefineModal extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    modalVisible: PropTypes.bool,
    systemTargetOption: PropTypes.array,
    systemSourceOption: PropTypes.array,
    systemSourceIn: PropTypes.string,
    systemTargetIn: PropTypes.string,
  };

  static defaultProps = {
    title: '新建规则',
    modalVisible: false,
    systemTargetOption: [
      { value: 'afds', label: 'qsxd' },
      { value: 'afdfadsfs', label: 'tgnj' },
      { value: 'afvvszds', label: 'bc' },
      { value: 'avdszfds', label: 'yjad' },
    ],
    systemSourceOption: [{ value: 'afds', label: '手动' }, { value: 'afdfadsfs', label: '自动' }],
    systemSourceIn: 'afds',
    systemTargetIn: 'afds',
  };

  constructor(props) {
    super(props);
    this.state = {
      // ModalVisible: false,
    };
  }

  componentDidMount() {}

  // componentWillReceiveProps(props, nextProps) {

  // }

  // 确定
  okHandle = () => {
    const { form, handleCheck } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleCheck(fieldsValue);
    });
  };
  // 取消modal
  handleModalCancel = () => {
    const { form, handleModalVisible } = this.props;
    handleModalVisible();
    form.resetFields();
  };
  render() {
    const { title, modalVisible, form } = this.props;

    const { systemSourceOption, systemTargetOption, systemSourceIn, systemTargetIn } = this.props;

    const { getFieldDecorator } = form;

    return (
      <Modal
        title={title}
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={this.handleModalCancel}
      >
        <Form>
          <FormItem label="任务名称">
            {getFieldDecorator('mapName', {
              // initialValue: mapName,
              rules: [{ required: true, message: 'Please input some description...' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItemSelect
            options={systemSourceOption}
            getFieldDecorator={getFieldDecorator}
            fieldId="tableNumberSource"
            initialValue={systemSourceIn}
            label="源系统"
          />
          <FormItemSelect
            options={systemTargetOption}
            getFieldDecorator={getFieldDecorator}
            fieldId="tableNumberTarget"
            initialValue={systemTargetIn}
            label="目标系统"
          />
        </Form>
      </Modal>
    );
  }
}
const Index = Form.create()(DefineModal);
export default Index;
