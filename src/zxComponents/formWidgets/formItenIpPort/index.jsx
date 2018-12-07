import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CmsIpPort from './cmsIpPort';

export default class Index extends Component {
  static propTypes = {
    getFieldDecorator: PropTypes.func.isRequired, //form必须
    formItemLayout: PropTypes.object, //表单布局
    fieldId: PropTypes.string, //表单英文名
    label: PropTypes.string, //表单中文名
    required: PropTypes.bool, //是否必填
    initialValue: Prototype.object, //表单初始值
  };
  static defaultProps = {
    formItemLayout: { labelCol: { span: 6 }, wrapperCol: { span: 14 } },
    required: true,
    disabled: false,
    initialValue: { ip: '', port: 0 },
  };
  checkIpPort(rule, value, callback) {
    const ipPattern = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;

    const portPattern = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
    if (ipPattern.test(value.ipAddress)) {
      callback();
    } else {
      callback('ip输入有误');
    }
  }

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
      <FormItem label={label} {...formItemLayout}>
        {getFieldDecorator(fieldId, {
          initialValue: initialValue,
          rules: [
            { required: required, message: '必填' },
            { validator: this.checkIpPort.bind(this) },
          ],
        })(<CmsIpPort />)}
      </FormItem>
    );
  }
}
