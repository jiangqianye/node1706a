import React, { Component } from 'react';
import { Modal, Form, Input, Spin, Select } from 'antd';
import { FormItemSelect } from 'zxComponents/formWidgets';

const FormItem = Form.Item;
const { Option } = Select;

const options = {
  onFieldsChange(props, changedFields) {
    // props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return props.paramInfo && JSON.stringify(props.paramInfo) !== '{}'
      ? {
          category: Form.createFormField({ value: props.paramInfo.category.value }),
          paramName: Form.createFormField({ value: props.paramInfo.paramName }),
          paramValue: Form.createFormField({ value: props.paramInfo.paramValue }),
          remark: Form.createFormField({ value: props.paramInfo.remark }),
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
    this.state = {};
  }

  okHandle = () => {
    const { form, handleAdd, paramInfo } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const result = paramInfo ? { key: paramInfo.key, ...fieldsValue } : fieldsValue;
      handleAdd(result);
    });
  };
  cancelHandle = () => {
    const { form, handleModalVisible } = this.props;
    form.resetFields();
    handleModalVisible();
  };

  render() {
    const { modalVisible, form, title, loading } = this.props;

    const categoryOptions = [
      { value: '1', label: '算法系统接口' },
      { value: '2', label: '日志管理' },
    ];
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };
    return (
      <Modal title={title} visible={modalVisible} onOk={this.okHandle} onCancel={this.cancelHandle}>
        <Spin spinning={loading}>
          <Form>
            <FormItemSelect
              getFieldDecorator={form.getFieldDecorator}
              label="类别名称"
              formItemLayout={formItemLayout}
              fieldId="category"
              options={categoryOptions}
            />
            <FormItem {...formItemLayout} label="参数名">
              {form.getFieldDecorator('paramName', {
                rules: [{ required: true, message: '必填' }],
              })(<Input placeholder="请输入参数名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="参数值">
              {form.getFieldDecorator('paramValue', {
                rules: [{ required: true, message: '必填' }],
              })(<Input placeholder="请输入参数值" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="备注">
              {form.getFieldDecorator('remark', {
                rules: [{ required: true, message: '必填' }],
              })(<Input placeholder="请输入备注" />)}
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    );
  }
}
