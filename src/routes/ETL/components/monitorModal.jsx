import React, { Component } from 'react';
import { Modal, Form, Input, Spin } from 'antd';
import { FormItemSelect } from '../../../zxComponents';

const FormItem = Form.Item;

const options = {
  onFieldsChange(props, changedFields) {
    // props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return props.monitorInfo && JSON.stringify(props.monitorInfo) !== '{}'
      ? {
          sourcePath: Form.createFormField({ value: props.monitorInfo.sourcePath }),
          mapName: Form.createFormField({ value: props.monitorInfo.mapName }),
          mode: Form.createFormField({ value: props.monitorInfo.mode }),
          remark: Form.createFormField({ value: props.monitorInfo.remark }),
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
    const { form, handleAdd, monitorInfo } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const result = monitorInfo ? { key: monitorInfo.key, ...fieldsValue } : fieldsValue;
      handleAdd(result);
    });
  };
  cancelHandle = () => {
    const { form, handleModalVisible } = this.props;
    form.resetFields();
    handleModalVisible();
  };

  render() {
    const sourcePathOptions = [
      { label: 'rfqew', value: 'qrfwez' },
      { label: 'efw', value: 'gadxc' },
      { label: 'zs', value: 'qrfwegaz' },
      { label: 'z', value: 'wgsd' },
    ];
    const modeOptions = [
      { label: 'ue', value: 'qrjgnfwez' },
      { label: 'efxxbw', value: 'gadfxc' },
      { label: 'zaqas', value: 'qrfwegbdxaz' },
      { label: 'agaz', value: 'wgsgsexersed' },
    ];
    const { modalVisible, form, title, loading } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <Modal title={title} visible={modalVisible} onOk={this.okHandle} onCancel={this.cancelHandle}>
        <Spin spinning={loading}>
          <FormItemSelect
            required
            formItemLayout={formItemLayout}
            options={sourcePathOptions}
            getFieldDecorator={getFieldDecorator}
            fieldId="sourcePath"
            label="选择转换"
            style={{ width: 200 }}
          />
          <FormItem label="任务别名" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
            {getFieldDecorator('mapName', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(<Input disabled={false} placeholder="请输入" />)}
          </FormItem>
          <FormItemSelect
            required
            formItemLayout={formItemLayout}
            options={modeOptions}
            getFieldDecorator={getFieldDecorator}
            fieldId="mode"
            label="业务模式"
            style={{ width: 200 }}
          />
          <FormItem label="备注信息" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
            {getFieldDecorator('remark', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Spin>
      </Modal>
    );
  }
}
