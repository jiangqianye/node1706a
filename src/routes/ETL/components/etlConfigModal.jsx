import React, { Component } from 'react';
import { Modal, Form, Input, Spin } from 'antd';
import { FormItemSelect } from '../../../zxComponents';

const FormItem = Form.Item;

const options = {
  onFieldsChange(props, changedFields) {
    // props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return props.etlConfigInfo && JSON.stringify(props.etlConfigInfo) !== '{}'
      ? {
          trans: Form.createFormField({ value: props.etlConfigInfo.trans }),
          sourcePath: Form.createFormField({ value: props.etlConfigInfo.sourcePath }),
          mapName: Form.createFormField({ value: props.etlConfigInfo.mapName }),
          mode: Form.createFormField({ value: props.etlConfigInfo.mode }),
          remark: Form.createFormField({ value: props.etlConfigInfo.remark }),
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
    const { form, handleAdd, etlConfigInfo } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const result = etlConfigInfo ? { key: etlConfigInfo.key, ...fieldsValue } : fieldsValue;
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
    const { getFieldDecorator } = form;

    const transOptions = [
      { value: 'afds', label: 'qsxd' },
      { value: 'afdfadsfs', label: 'tgnj' },
      { value: 'afvvszds', label: 'bc' },
      { value: 'avdszfds', label: 'yjad' },
    ];
    const modeOptions = [{ value: 'afds', label: '手动' }, { value: 'afdfadsfs', label: '自动' }];
    // const unChange = false,
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <Modal title={title} visible={modalVisible} onOk={this.okHandle} onCancel={this.cancelHandle}>
        <Spin spinning={loading}>
          <Form>
            <FormItemSelect
              required
              formItemLayout={formItemLayout}
              options={transOptions}
              getFieldDecorator={getFieldDecorator}
              fieldId="trans"
              label="选择转换"
              // style={{ width: 200 }}
            />
            <FormItem label="任务别名" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
              {getFieldDecorator('mapName', {
                rules: [{ required: true, message: 'Please input some description...' }],
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItemSelect
              required
              formItemLayout={formItemLayout}
              options={modeOptions}
              getFieldDecorator={getFieldDecorator}
              fieldId="mode"
              label="业务模式"
              // style={{ width: 200 }}
            />
            <FormItem label="备注信息" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
              {getFieldDecorator('remark', {
                rules: [{ required: true, message: 'Please input some description...' }],
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    );
  }
}
