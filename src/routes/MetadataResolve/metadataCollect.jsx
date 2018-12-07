import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';

import { Row, Col, Card, Form, Input, Icon, Button, Dropdown, Menu, Modal, message } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from '../common.less';

const FormItem = Form.Item;
const { Search } = Input;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ metadataImport, loading }) => ({
  metadataImport,
  loading: loading.models.metadataImport,
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
      type: 'metadataImport/fetch',
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
      type: 'metadataImport/fetch',
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
      type: 'metadataImport/fetch',
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
          type: 'metadataImport/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
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
        type: 'metadataImport/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };
  // 数据添加
  handleAdd = fields => {
    this.props.dispatch({
      type: 'metadataImport/add',
      payload: {
        description: fields.desc,
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
          <Col md={12} sm={24}>
            <FormItem label="">
              {getFieldDecorator('searchValue')(<Search placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
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
    //  const { metadataImport: { data }, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
      },
      {
        title: '数据源名称',
        dataIndex: 'name',
      },
      {
        title: '描述',
        dataIndex: 'describe',
      },
      {
        title: '数据库类型',
        dataIndex: 'databaseType',
      },
      {
        title: '表数目',
        dataIndex: 'tableNumber',
      },
      {
        title: '采集状态',
        dataIndex: 'state',
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href="">查看</a>
          </Fragment>
        ),
      },
    ];

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">采集</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="元数据采集">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={17}>
                <div className={styles.tableListForm}>{this.renderForm()}</div>
              </Col>
              <Col md={7}>
                <div className={styles.tableListOperator}>
                  <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                    新建
                  </Button>
                  <span>
                    <Dropdown overlay={menu}>
                      <Button>
                        批量操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                </div>
              </Col>
            </Row>

            <StandardTable
              selectedRows={selectedRows}
              loading={false}
              data={[]}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}

/*
              <Col md={16} >
                <div className={styles.tableListForm}>
                  {this.renderForm()}
                </div>
              </Col>

            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              <Button icon="primary" type="primary" onClick={() => this.handleModalVisible(true)}>
                预览
              </Button>
              <span>
                <Dropdown overlay={menu}>
                  <Button>
                    批量操作 <Icon type="down" />
                  </Button>
                </Dropdown>
              </span>
            </div>
*/
