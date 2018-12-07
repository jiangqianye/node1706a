import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

class FormItemSelect extends Component {
  static propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    formItemLayout: PropTypes.object,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    fieldId: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.array.isRequired,
    extra: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.object,
  };
  static defaultProps = {
    // options: [{ value: '', label: '全部' }],
    required: true,
    // style: { width: '200px' },
    placeholder: '请输入',
    formItemLayout: {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    },
  };

  onChange(value) {
    if (this.props.handleSelectChange) {
      this.props.handleSelectChange(value);
    }
  }

  renderOptions(options) {
    let doms = [];
    if (Array.isArray(options)) {
      options.forEach(item => {
        let value = String(item.value);
        doms.push(
          <Option value={value} key={value}>
            {item.label}
          </Option>
        );
      });
    }
    return doms;
  }

  render() {
    const {
      label,
      formItemLayout,
      getFieldDecorator,
      fieldId,
      initialValue,
      required,
      placeholder,
      options,
      extra,
      style,
      className,
      disabled,
    } = this.props;
    return (
      <FormItem
        {...formItemLayout}
        label={label}
        extra={extra}
        //hasFeedback
      >
        {getFieldDecorator(fieldId, {
          initialValue: initialValue,
          rules: [{ required: required, message: '必选' }],
        })(
          <Select
            disabled={disabled}
            placeholder={placeholder}
            style={style}
            className={className}
            onChange={this.onChange.bind(this)}
            showSearch={options.length > 5}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.renderOptions(options)}
          </Select>
        )}
      </FormItem>
    );
  }
}

export default FormItemSelect;
