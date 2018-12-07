import React, { Component } from 'react';
import { Modal, Form, Input, Spin } from 'antd';

const FormItem = Form.Item;

const options = {
  onFieldsChange(props, changedFields) {
    // props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return props.roleInfo && JSON.stringify(props.roleInfo) !== '{}'
      ? {
        roleName: Form.createFormField({ value: props.roleInfo.roleName }),
        remark: Form.createFormField({ value: props.roleInfo.remark }),
       // password: Form.createFormField({ value: props.roleInfo.password }),
       // confirm: Form.createFormField({ value: props.roleInfo.password }),
      }
      : {};
  },
  onValuesChange(_, values) {
    // console.log(values);
  },
};

@Form.create(options)
export default class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
    };
  }

  okHandle = () => {
    const { form, handleAdd, roleInfo } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const result = roleInfo ? { key: roleInfo.key, ...fieldsValue } : fieldsValue;
      handleAdd(result);
    });
  };
  cancelHandle = () => {
    const { form, handleModalVisible } = this.props;
    form.resetFields();
    handleModalVisible();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { modalVisible, form, title, loading } = this.props;
    return (
      <Modal title={title} visible={modalVisible} onOk={this.okHandle} onCancel={this.cancelHandle}>
        <Spin spinning={loading}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色名称">
            {form.getFieldDecorator('roleName', {
              rules: [{ required: true, message: '角色名称不能为空' }],
            })(<Input placeholder="请输入角色名称" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
            {form.getFieldDecorator('remark', {})(<Input placeholder="请输入备注信息" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="授权">
            {form.getFieldDecorator('emPower', {})(<Input placeholder="这里显示节点树" />)}
          </FormItem>
        </Spin>
      </Modal>
    );
  }
}
