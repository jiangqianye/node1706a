import React, { Component } from 'react';
import { Modal, Form, Input, Spin } from 'antd';

const FormItem = Form.Item;

const options = {
  onFieldsChange(props, changedFields) {
    // props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return props.userInfo && JSON.stringify(props.userInfo) !== '{}'
      ? {
          userName: Form.createFormField({ value: props.userInfo.userName }),
          email: Form.createFormField({ value: props.userInfo.email }),
          password: Form.createFormField({ value: props.userInfo.password }),
          confirm: Form.createFormField({ value: props.userInfo.password }),
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
    const { form, handleAdd, userInfo } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const result = userInfo ? { key: userInfo.key, ...fieldsValue } : fieldsValue;
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
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('密码不一致');
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { modalVisible, form, title, loading } = this.props;
    return (
      <Modal title={title} visible={modalVisible} onOk={this.okHandle} onCancel={this.cancelHandle}>
        <Spin spinning={loading}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
            {form.getFieldDecorator('userName', {
              rules: [{ required: true, message: '只能包含大写、小写、数字和下划线且为6到12位' }],
            })(<Input placeholder="请输入用户名" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="新密码">
            {form.getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '必填',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input type="password" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="确认密码">
            {form.getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '必填',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="邮箱">
            {form.getFieldDecorator('email', {
              rules: [
                { type: 'email', message: '邮箱格式不正确' },
                { required: true, message: '必填' },
              ],
            })(<Input placeholder="请输入邮箱" />)}
          </FormItem>
        </Spin>
      </Modal>
    );
  }
}
