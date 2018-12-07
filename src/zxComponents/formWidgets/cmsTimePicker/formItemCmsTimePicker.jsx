import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import CmsTimePicker from './cmsTimePicker';

const FormItem = Form.Item;
class FormItemCmsTimePicker extends Component {
  state = {};
  render() {
    const {
      getFieldDecorator,
      formItemLayout,
      fieldId,
      label,
      required,
      initialValue,
    } = this.props;
    return (
      <FormItem>
        {getFieldDecorator(fieldId, {
          initialValue: initialValue,
          rules: [{ required: required, message: '必填' }],
        })(<CmsTimePicker />)}
      </FormItem>
    );
  }
}

export default FormItemDatePicker;
