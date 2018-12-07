import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import { Row, Col, Card, Form, Input, Button, message, Dropdown, Icon, Menu } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StructStandModal from './components/structStandModal';

import styles from '../common.less';

const FormItem = Form.Item;
const { Search } = Input;

@connect(({ structStand, loading }) => ({
  structStand,
  loading: loading.models.structStand,
}))
@Form.create()
export default class StructStand extends PureComponent {
  state = {
    modalVisible: false,
    formValues: {},
    // expandForm: false, 搜索条件展开和收起状态
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'structStand/fetch',
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
        type: 'structStand/fetch',
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
      type: 'structStand/fetch',
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
      type: 'structStand/fetch',
    });
  };
  // Modal
  handleModalVisible = (flag, selectedKey) => {
    const { dispatch } = this.props;
    const modalVisible = !!flag;
    if (modalVisible) {
      dispatch({
        type: 'structStand/fetch',
        payload: { key: selectedKey },
      });
    }
    this.setState({
      modalVisible,
    });
  };
  handleAdd = fields => {
    this.props.dispatch({
      type: 'structStand/add',
      payload: fields,
    });
    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };
  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) {
      message.error('至少选择一条数据');
      return;
    }

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'structStand/delete',
          payload: {
            selectedRows: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      case 'approval':
        dispatch({
          type: 'structStand/fetch',
        });
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
            <FormItem label="目标表名">
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
    const { selectedRows, modalVisible } = this.state;
    const { structStand, loading } = this.props;
    const { dataSource } = structStand;
    const columns = [
      // { title: '序号', dataIndex: 'index', key: 'index' },
      { title: '映射名称', dataIndex: 'mapName', key: 'mapName' },
      {
        title: '数据源名称（源）',
        dataIndex: 'dataSourceNameSource',
        key: 'dataSourceNameSource',
      },
      { title: '表总数量（源）', dataIndex: 'tableNumberSource', key: 'tableNumberSource' },
      {
        title: '数据源名称（目标）',
        dataIndex: 'dataSourceNameTarget',
        key: 'dataSourceNameTarget',
      },
      { title: '表总数量（目标）', dataIndex: 'tableNumberTarget', key: 'tableNumberTarget' },
      {
        title: '映射状态',
        dataIndex: 'mapState',
        key: 'mapState',
      },
      {
        title: '操作',
        render: () => <Link to="/etl/structStand">查看</Link>,
      },
    ];
    const modalMethods = {
      modalVisible,
      handleCheck: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      title: '新建规则',
    };

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );
    return (
      <PageHeaderLayout title="结构标准化">
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
        <StructStandModal {...modalMethods} />
      </PageHeaderLayout>
    );
  }
}
