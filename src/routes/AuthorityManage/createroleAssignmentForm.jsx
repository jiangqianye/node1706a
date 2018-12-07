import React, { Component } from 'react';
import { Modal, Form, Input, Spin, Button, Checkbox, } from 'antd';

const FormItem = Form.Item;

const options = {
  onFieldsChange(props, changedFields) {
    // props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return props.roleAssignmentInfo && JSON.stringify(props.roleAssignmentInfo) !== '{}'
      ? {
        userName: Form.createFormField({ value: props.roleAssignmentInfo.userName }),
        roleName: Form.createFormField({ value: props.roleAssignmentInfo.roleName }),
        // password: Form.createFormField({ value: props.userInfo.password }),
        // confirm: Form.createFormField({ value: props.userInfo.password }),
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
    const { form, handleAdd, roleAssignmentInfo } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const result = roleAssignmentInfo ? { key: roleAssignmentInfo.key, ...fieldsValue } : fieldsValue;
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
  checkBoxonChange = e => {
    console.log(`checked = ${e.target.checked}`);
  }

  render() {
    const { modalVisible, form, title, loading } = this.props;
    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     span: 15,
    //     offset: 5,
    //   },
    // };

    // {...tailFormItemLayout} 
    return (
      <Modal title={title} visible={modalVisible} onOk={this.okHandle} onCancel={this.cancelHandle}>
        <Spin spinning={loading}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
            {form.getFieldDecorator('userName', {})(<Input placeholder="这里显示节点树" />)}
          </FormItem>
          <FormItem wrapperCol={{ span: 15 }}>
            {form.getFieldDecorator('roleName', {})(
              <Checkbox onChange={this.checkBoxonChange}>超级管理员</Checkbox>
            )}
          </FormItem>
          <FormItem wrapperCol={{ span: 15 }}>
            {form.getFieldDecorator('roleNameTwo', {})(
              <Checkbox >系统管理员</Checkbox>
            )}
          </FormItem>
        </Spin>
      </Modal>
    );
  }
}
