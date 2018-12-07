import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Select, Icon, Button } from 'antd';

import styles from '../common.less';

const FormItem = Form.Item;
const { Option } = Select;
const { Search } = Input;

export default class EventManageSearchForm extends Component {
  static propTypes = {
    prop: PropTypes,
  };
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      expandForm: false,
    };
  }

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'eventManage/fetch',
        payload: values,
      });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'eventManage/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="关键字">
              {getFieldDecorator('search')(<Search placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="级别筛选">
              {getFieldDecorator('level')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="">所有</Option>
                  <Option value="fault">故障</Option>
                  <Option value="warning">警告</Option>
                  <Option value="event">事件</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="关键字">
              {getFieldDecorator('search')(<Search placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="级别筛选">
              {getFieldDecorator('level')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="">所有</Option>
                  <Option value="fault">故障</Option>
                  <Option value="warning">警告</Option>
                  <Option value="event">事件</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="处理状态">
              {getFieldDecorator('state')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="">所有</Option>
                  <Option value="ok">已处理</Option>
                  <Option value="no">未处理</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }
  render() {
    return this.renderForm();
  }
}
