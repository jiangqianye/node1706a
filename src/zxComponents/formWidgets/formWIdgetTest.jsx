import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';
import FormItemName from './formItemName';
const FormItem = Form.Item;

class FormWidgetTest extends Component {
  static propTypes = {
    attribute: PropTypes.object,
    callback: PropTypes.func,
  };

  handleOk() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.callback('error');
      } else {
        this.props.callback(values);
      }
    });
  }

  render() {
    const { callback, attribute } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <FormItemName getFieldDecorator={getFieldDecorator} {...attribute} />
        <FormItem>
          <Button onClick={this.handleOk.bind(this)}>提交</Button>
        </FormItem>
      </Form>
    );
  }
}

const Index = Form.create()(FormWidgetTest);

export default Index;
