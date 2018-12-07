import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';

import { Row, Col, Card, Form, Input, Button, Menu, Dropdown, Icon, message } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import AppSystemModal from './components/appSystemModal';

import styles from '../common.less';

const FormItem = Form.Item;
const { Search } = Input;

@connect(({ appSystem, loading }) => ({
  appSystem,
  loading: loading.models.appSystem,
  // expandForm: false, 搜索条件展开和收起状态
}))
@Form.create()
export default class AppSystem extends PureComponent {
  state = {
    formValues: {},
    modalVisible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'appSystem/fetch',
    });
  }
  onSelectRow = selectedRows => {
    this.setState({
      selectedRows,
    });
  };

  // 分页
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
      type: 'appSystem/fetch',
      payload: params,
    });
  };
  // 批量操作
  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) {
      message.error('请选择至少一行数据');
      return;
    }
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'appSystem/delete',
          payload: {
            selectedRows: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        }).then(() => message.success('删除成功'));
        // console.log(selectedRows);
        break;
      default:
        break;
    }
  };

  // 搜索
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      this.setState({
        formValues: fieldsValue,
      });
      if (err) return;
      dispatch({
        type: 'appSystem/fetch',
        payload: fieldsValue,
      });
    });
  };
  // 重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'appSystem/fetch',
      payload: {},
    });
  };
  // 添加 modal 确认
  handleAdd = fields => {
    // console.log(fields)
    this.props
      .dispatch({
        type: 'appSystem/addOrUpdate',
        payload: fields,
      })
      .then(() => message.success('添加成功'));
    this.setState({
      modalVisible: false,
    });
  };
  handleModalVisible = (flag, selectedKey) => {
    const { dispatch } = this.props;
    const modalVisible = !!flag;
    if (modalVisible && selectedKey) {
      dispatch({
        type: 'appSystem/fetchBykey',
        payload: { key: selectedKey },
      });
    } else if (Boolean(modalVisible) === false) {
      dispatch({
        type: 'appSystem/clearInfo',
        payload: {},
      });
    }
    this.setState({
      modalVisible,
    });
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="系统名称">
              {getFieldDecorator('searchValue')(<Search placeholder="请输入系统名称关键字" />)}
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
              {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a> */}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  // renderAdvancedForm() {
  //   const { getFieldDecorator } = this.props.form;
  //   return (
  //     <Form onSubmit={this.handleSearch} layout="inline">
  //       <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
  //         <Col md={8} sm={24}>
  //           <FormItem label="关键字">
  //             {getFieldDecorator('searchValue')(<Search placeholder="请输入" />)}
  //           </FormItem>
  //         </Col>
  //       </Row>
  //       <div style={{ overflow: 'hidden' }}>
  //         <span style={{ float: 'right', marginBottom: 24 }}>
  //           <Button type="primary" htmlType="submit">
  //             查询
  //           </Button>
  //           <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
  //             重置
  //           </Button>
  //           <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
  //             收起 <Icon type="up" />
  //           </a>
  //         </span>
  //       </div>
  //     </Form>
  //   );
  // }

  // 搜索条件展开与收起

  // toggleForm = () => {
  //   this.setState({
  //     expandForm: !this.state.expandForm,
  //   });
  // };

  // renderForm() {
  //   return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  // }
  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const { appSystem, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;
    const { dataSource, appSystemInfo } = appSystem;
    const columns = [
      // { title: '序号', dataIndex: 'index', key: 'index' },
      { title: '系统名称', dataIndex: 'systemName', key: 'systemName' },
      { title: '备注', dataIndex: 'remark', key: 'Remarks' },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleModalVisible(true, record.key)}>修改</a>
          </Fragment>
        ),
      },
    ];
    const modalMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      modalVisible,
      appSystemInfo,
      loading,
      title: appSystemInfo == null ? '新增' : '修改',
    };
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );
    return (
      <PageHeaderLayout title="应用系统配置">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新增
              </Button>
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
              data={dataSource}
              columns={columns}
              alter={false}
              onChange={this.handleStandardTableChange}
              onSelectRow={this.onSelectRow}
            />
          </div>
        </Card>
        <AppSystemModal {...modalMethods} />
      </PageHeaderLayout>
    );
  }
}
