import React, { PureComponent } from 'react';
import { connect } from 'dva';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  // Modal,
  // message,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from '../common.less';

const FormItem = Form.Item;
const { Option } = Select;
const { Search } = Input;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ eventManage, loading }) => ({
  eventManage,
  loading: loading.models.eventManage,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
    expandForm: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'eventManage/fetch',
    });
  }

  // 表单值改变后，将值存到store
  onFieldsChange(changedFields) {
    const { dispatch } = this.props;
    dispatch({
      type: 'eventManage/formSearch',
      payload: changedFields,
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'eventManage/fetch',
      payload: params,
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

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'eventConfirm':
        dispatch({
          type: 'eventManage/eventConfirm',
          payload: {
            keys: selectedRows.map(row => row.key).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

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
    const { eventManage: { data }, loading } = this.props;
    const { selectedRows } = this.state;

    const columns = [
      { title: '序号', dataIndex: 'key' },
      { title: '级别', dataIndex: 'level', render: text => <span>{text.label}</span> },
      { title: '模块名称', dataIndex: 'moduleName' },
      { title: '事件名称', dataIndex: 'eventName' },
      { title: '事件描述', dataIndex: 'eventdescribe' },
      { title: '发生时间', dataIndex: 'happenTime' },
      { title: '处理时间', dataIndex: 'dealTime' },
      { title: '处理用户', dataIndex: 'dealUser' },
      { title: '修复建议', dataIndex: 'repairSuggest' },
    ];

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="eventConfirm">事件确认</Menu.Item>
      </Menu>
    );

    return (
      <PageHeaderLayout title="事件管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <span>
                <Dropdown overlay={menu}>
                  <Button>
                    批量操作 <Icon type="down" />
                  </Button>
                </Dropdown>
              </span>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
