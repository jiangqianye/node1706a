import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

export default class FormItemName extends Component {
  static propTypes = {
    getFieldDecorator: PropTypes.func.isRequired, //form必须
    formItemLayout: PropTypes.object, //表单布局
    fieldId: PropTypes.string, //表单英文名
    label: PropTypes.string, //表单中文名
    required: PropTypes.bool, //是否必填
    initialValue: Prototype.string, //表单初始值
    disabled: PropTypes.bool, // 输入框是否可以编辑
    max: PropTypes.number, //最大值
    min: PropTypes.number, //最小值
    placeholder: PropTypes.string, //水印提示
    prefix: PropTypes.object, //输入框样式
    style: PropTypes.object, //输入框样式
  };
  static defaultProps = {
    formItemLayout: { labelCol: { span: 6 }, wrapperCol: { span: 14 } },
    required: true,
    disabled: false,
    initialValue: '',
    min: 4,
    max: 10,
  };
  constructor(props) {
    super(props);
  }
  checkInput(rule, value, callback) {
    let pattern = new RegExp(
      "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
    );
    if (!pattern.test(value.trim())) {
      callback();
      return;
    } else {
      callback('不能输入特殊字符');
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
      disabled,
      max,
      min,
      placeholder,
      prefix,
      style,
    } = this.props;
    return (
      <FormItem label={label} {...formItemLayout}>
        {getFieldDecorator(fieldId, {
          initialValue: initialValue,
          rules: [
            { required: required, message: '必填' },
            { pattern: /^[^\\\/\:`~!@#$%^&*()-+.,;'/*-+.<>{}|]/ },
            { max: max, message: `不能超过${max}个字` },
            { min: min, message: `至少${min}个字` },
          ],
        })(<Input placeholder={placeholder} disabled={disabled} />)}
      </FormItem>
    );
  }
}
