import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import { Link } from 'dva/router';

import { Row, Col, Card, Form, Input, Button, Modal, message, Dropdown, Icon, Menu } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { FormItemSelect } from '../../zxComponents';

import styles from '../common.less';

const FormItem = Form.Item;

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

@connect(({ dataStand, loading }) => ({
  dataStand,
  loading: loading.models.dataStand,
}))
@Form.create()
export default class DataStand extends PureComponent {
  state = {
    formValues: {},
    modalVisible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dataStand/fetch',
    });
  }
  onSelectRow = selectedRows => {
    this.setState({
      selectedRows,
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
      type: 'dataStand/fetch',
      // payload: params,
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };
  handleModalCancel = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      this.setState({
        formValues: fieldsValue,
      });
      if (err) return;
      dispatch({
        type: 'dataStand/fetch',
        payload: fieldsValue,
      });
    });
    this.setState({
      modalVisible: false,
    });
  };
  handleAdd = fields => {
    // this.props.dispatch({
    //   type: 'rule/add',
    //   payload: {
    //     description: fields.desc,
    //   },
    // });
    message.error(fields);
    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };
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
          type: 'dataStand/delete',
          payload: {
            selectedRows: selectedRows.map(rows => rows.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        }).then(() => message.success('删除成功'));
        break;
      case 'approval':
        dispatch({
          type: 'dataStand/fetch',
        });
        break;
      default:
        break;
    }
  };

  render() {
    const { modalVisible, selectedRows } = this.state;
    const { dataStand, loading } = this.props;
    const { dataSource } = dataStand;
    const columns = [
      // { title: '序号', dataIndex: 'index', key: 'index' },
      { title: '源表', dataIndex: 'sourceTable', key: 'sourceTable' },
      { title: '目标表', dataIndex: 'targetTable', key: 'targetTable' },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        // render: (text) => this.statusIcon(text),
      },
    ];
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="updateFlex">上传映射</Menu.Item>
        <Menu.Item key="sync">同步</Menu.Item>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );
    return (
      <PageHeaderLayout title="数据标准化">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{/* {this.renderForm()} */}</div>
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
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}
