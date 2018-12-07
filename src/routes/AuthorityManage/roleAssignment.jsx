import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';

import { Row, Col, Card, Form, Input, Icon, Button, Dropdown, Menu, Modal, message } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import CreateForm from './createroleAssignmentForm';
import styles from '../common.less';

const FormItem = Form.Item;
const { Search } = Input;

@connect(({ authorityManageroleAssignment, loading }) => ({
  authorityManageroleAssignment,
  loading: loading.models.authorityManageroleAssignment,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
    formValues: {},
  };
  // 初始化页面数据
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'authorityManageroleAssignment/fetch',
    });
  }
  // 表格改变事件
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'authorityManageroleAssignment/fetch',
      payload: params,
    });
  };
  // 搜索条件重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'authorityManageroleAssignment/fetch',
      payload: {},
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'authorityManageroleAssignment/remove',
          payload: {
            keys: selectedRows.map(row => row.key),
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
  // 搜索
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'authorityManageroleAssignment/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = (flag, selectedKey) => {
    const { dispatch } = this.props;
    const modalVisible = !!flag;
    if (modalVisible && selectedKey) {
      dispatch({
        type: 'authorityManageroleAssignment/fetchbyId',
        payload: { key: selectedKey },
      });
    } else if (Boolean(modalVisible) === false) {
      dispatch({
        type: 'authorityManageroleAssignment/clearroleAssignmentInfo',
        payload: {},
      });
    }
    this.setState({
      modalVisible,
    });
  };
  // 数据添加
  handleAdd = fields => {
    this.props.dispatch({
      type: 'authorityManageroleAssignment/addOrUpdate',
      payload: {
        addData: fields,
      },
    });
    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="">
              {getFieldDecorator('searchValue')(<Search placeholder="请输入" />)}
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
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { authorityManageroleAssignment: { data, roleAssignmentInfo }, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;

    const columns = [
      { title: '序号', dataIndex: 'key' },
      { title: '用户名', dataIndex: 'userName' },
      // { title: '对应角色', dataIndex: 'roleName' },
      {
        title: '对应角色',
        dataIndex: 'roleName',
        render: (text, record) => {
          return text==1?"超级管理员":"系统管理员"
      },
    },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleModalVisible(true, record.key)}>角色分配</a>
          </Fragment>
        ),
      },
    ];

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      modalVisible,
      roleAssignmentInfo,
      title: roleAssignmentInfo == null ? '新增用户信息' : '修改用户信息',
      loading,
    };

    return (
      <PageHeaderLayout title="用户管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>

            <div className={styles.tableListOperator}>
              {/* <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button> */}
              {/* <span>
                <Dropdown overlay={menu}>
                  <Button>
                    批量操作 <Icon type="down" />
                  </Button>
                </Dropdown>
              </span> */}
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
        <CreateForm {...parentMethods} />
      </PageHeaderLayout>
    );
  }
}
