import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import CmsCascader from './cmsCascader';
const FormItem = Form.Item;

export default class Index extends Component {
  static propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    formItemLayout: PropTypes.object,
    label: PropTypes.string,
    fieldId: PropTypes.string,
    initialValue: PropTypes.string,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.array.isRequired,
    extra: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.object,
  };
  static defaultProps = {
    showSearch: false,
    options: [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ],
  };
  // constructor(props, context) {
  //     super(props, context)

  // }
  check(rule, value, callback) {
    callback();
  }

  render() {
    const {
      label,
      formItemLayout,
      getFieldDecorator,
      fieldId,
      initialValue,
      required,
      // placeholder,
      options,
      extra,
      // style, className,
      showSearch,
      onChange,
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
          <CmsCascader
            options={options}
            showSearch={showSearch}
            allowClear={false}
            onChange={onChange}
          />
        )}
      </FormItem>
    );
  }
}
