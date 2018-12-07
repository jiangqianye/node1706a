import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { Row, Col, Card, Form, Button, Menu, Dropdown, Icon, message, Select } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from '../common.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ metadataVersionManage, loading }) => ({
  metadataVersionManage,
  loading: loading.models.metadataVersionManage,
}))
@Form.create()
export default class MetadataVersionManage extends PureComponent {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'metadataVersionManage/fetch',
      payload: {
        ...formValues,
      },
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
      type: 'metadataVersionManage/fetch',
      payload: params,
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
          type: 'metadataVersionManage/delete',
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
        type: 'metadataVersionManage/fetch',
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
      type: 'metadataVersionManage/fetch',
      payload: {},
    }).then(() => message.success('成功'));
  };
  // renderForm() {
  //   const { getFieldDecorator } = this.props.form;
  //   return (
  //     <Form onSubmit={this.handleSearch} layout="inline">
  //       <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
  //         <Col md={4} sm={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
  //           <FormItem>
  //             {getFieldDecorator('operate', {
  //               initialValue: '1',
  //               rules: [{ required: true, message: 'Please input your username!' }],
  //             })(
  //               <Select style={{ width: 120 }}>
  //                 <Option value="1">全部</Option>
  //                 <Option value="2">杭创</Option>
  //                 <Option value="3">天键</Option>
  //                 <Option value="4">东华</Option>
  //                 <Option value="5">中联</Option>
  //                 <Option value="6">东软</Option>
  //                 <Option value="7">九阵</Option>
  //                 <Option value="8">惠宜康</Option>
  //                 <Option value="9">厦门智业</Option>
  //                 <Option value="10">北大医信</Option>
  //                 <Option value="11">成电医星</Option>
  //                 <Option value="12">金仕达卫宁</Option>
  //                 <Option value="13">诚邦</Option>
  //                 <Option value="14">其他</Option>
  //               </Select>
  //             )}
  //           </FormItem>
  //         </Col>
  //         <Col md={4} sm={24}>
  //           <span className={styles.submitButtons}>
  //             <Button type="primary" htmlType="submit">
  //               查询
  //             </Button>
  //             <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
  //               重置
  //             </Button>
  //           </span>
  //         </Col>
  //       </Row>
  //     </Form>
  //   );
  // }
  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem>
              {getFieldDecorator('operate', {
                initialValue: '1',
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Select style={{ width: '100%' }}>
                  <Option value="1">全部</Option>
                  <Option value="2">杭创</Option>
                  <Option value="3">天键</Option>
                  <Option value="4">东华</Option>
                  <Option value="5">中联</Option>
                  <Option value="6">东软</Option>
                  <Option value="7">九阵</Option>
                  <Option value="8">惠宜康</Option>
                  <Option value="9">厦门智业</Option>
                  <Option value="10">北大医信</Option>
                  <Option value="11">成电医星</Option>
                  <Option value="12">金仕达卫宁</Option>
                  <Option value="13">诚邦</Option>
                  <Option value="14">其他</Option>
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
    const { metadataVersionManage, loading } = this.props;
    const { dataSource } = metadataVersionManage;
    const columns = [
      // { title: '序号', dataIndex: 'index', key: 'index' },
      {
        title: '厂商',
        dataIndex: 'company',
        key: 'company',
        render: (text, record) => <span>{text.value}</span>,
      },
      { title: '表数目', dataIndex: 'tableNum', key: 'tableNum' },
      { title: '抽取标识', dataIndex: 'mark', key: 'mark' },
      { title: '抽取时间', dataIndex: 'time', key: 'time' },
    ];
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );
    return (
      <PageHeaderLayout title="元数据版本管理">
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
              loading={loading}
              data={dataSource}
              columns={columns}
              alter={false}
              onChange={this.handleStandardTableChange}
              onSelectRow={this.onSelectRow}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
