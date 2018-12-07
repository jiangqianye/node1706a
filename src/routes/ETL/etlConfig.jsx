import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';

import { Row, Col, Card, Form, Input, Button, message, Dropdown, Icon, Menu } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EtlConfigModal from './components/etlConfigModal';

import styles from '../common.less';

const FormItem = Form.Item;
const { Search } = Input;

@connect(({ etlConfig, loading }) => ({
  etlConfig,
  loading: loading.models.etlConfig,
}))
@Form.create()
export default class EtlConfig extends PureComponent {
  state = {
    formValues: {},
    modalVisible: false,
    // expandForm: false, 搜索条件展开和收起状态
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'etlConfig/fetch',
    });
  }
  onSelectRow = selectedRows => {
    this.setState({
      selectedRows,
    });
  };
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      this.setState({
        formValues: fieldsValue,
      });
      if (err) return;
      dispatch({
        type: 'etlConfig/fetch',
        payload: fieldsValue,
      });
    });
  };

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
      type: 'etlConfig/fetch',
      payload: params,
    });
  };

  //  搜索重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'etlConfig/fetch',
      payload: {},
    });
  };
  handleAdd = fields => {
    this.props.dispatch({
      type: 'etlConfig/addOrUpdate',
      payload: fields,
    });
    message.success('成功');
    this.setState({
      modalVisible: false,
    });
  };
  handleModalVisible = (flag, selectedKey) => {
    const { dispatch } = this.props;
    const modalVisible = !!flag;
    if (modalVisible && selectedKey) {
      dispatch({
        type: 'etlConfig/fetchBykey',
        payload: { key: selectedKey },
      });
    } else if (Boolean(modalVisible) === false) {
      dispatch({
        type: 'etlConfig/clearInfo',
        payload: {},
      });
    }
    this.setState({
      modalVisible,
    });
  };
  //  批量操作
  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) {
      message.error('请选择至少一行数据');
      return;
    }
    switch (e.key) {
      case 'run':
        dispatch({
          type: 'etlConfig/fetch',
        }).then(() => message.success('运行成功'));
        break;
      case 'pause':
        dispatch({
          type: 'etlConfig/fetch',
        }).then(() => message.success('暂停成功'));
        break;
      case 'remove':
        dispatch({
          type: 'etlConfig/delete',
          payload: {
            selectedRows: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        }).then(() => message.success('删除成功'));
        break;
      default:
        break;
    }
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="任务名称">
              {getFieldDecorator('searchValue')(<Search placeholder="请输入任务名称关键字" />)}
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
    const { etlConfig, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;
    const { dataSource, etlConfigInfo } = etlConfig;
    const columns = [
      // { title: '序号', dataIndex: 'index', key: 'index', },
      { title: '任务别名', dataIndex: 'mapName', key: 'mapName' },
      { title: '业务模式', dataIndex: 'mode', key: 'mode' },
      {
        title: '运行状态',
        dataIndex: 'runState',
        key: 'runState',
        // render: (text) => this.IconType(text),
      },
      {
        title: '修改',
        dataIndex: 'operate',
        key: 'operate',
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
      etlConfigInfo,
      loading,
      title: etlConfigInfo == null ? '新增' : '修改',
    };
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="run">运行</Menu.Item>
        <Menu.Item key="pause">暂停</Menu.Item>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );
    return (
      <PageHeaderLayout title="ETL配置">
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
              hasRowSelection
              onChange={this.handleStandardTableChange}
              onSelectRow={this.onSelectRow}
            />
          </div>
        </Card>
        <EtlConfigModal {...modalMethods} />
      </PageHeaderLayout>
    );
  }
}
