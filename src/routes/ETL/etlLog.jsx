import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { Row, Col, Card, Form, Input, Button, Select, message } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { FormItemSelect } from '../../zxComponents';

import styles from '../common.less';

const FormItem = Form.Item;
const { Search } = Input;
const { Option } = Select;

@connect(({ etlLog, loading }) => ({
  etlLog,
  loading: loading.models.etlLog,
}))
@Form.create()
export default class EtlLog extends PureComponent {
  state = {
    formValues: {},
    // expandForm: false, 搜索条件展开和收起状态
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'etlLog/fetch',
      payload: {
        ...formValues,
      },
    });
  }
  // 搜索表单
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      this.setState({
        formValues: fieldsValue,
      });
      if (err) return;
      dispatch({
        type: 'etlLog/fetch',
        payload: fieldsValue,
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
      type: 'etlLog/fetch',
      payload: {},
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
      type: 'etlLog/fetch',
      payload: params,
    });
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="模式">
              {getFieldDecorator('type', {
                initialValue: 'all',
                // rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="all">所有</Option>
                  <Option value="auto">自动</Option>
                  <Option value="manual">手动</Option>
                </Select>
              )}
            </FormItem>
          </Col>
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
    const { etlLog, loading } = this.props;
    const { dataSource } = etlLog;
    const columns = [
      // { title: '序号', dataIndex: 'index', key: 'index' },
      { title: '任务别名', dataIndex: 'missionName', key: 'missionName' },
      {
        title: '开始时间',
        dataIndex: 'start',
        key: 'start',
      },
      { title: '转换执行间隔', dataIndex: 'gap', key: 'gap' },
      {
        title: '抽取数量',
        dataIndex: 'amount',
        key: 'amount',
      },
      { title: '执行耗时（毫秒）', dataIndex: 'wasteTime', key: 'wasteTime' },
      {
        title: '抽取速度（条/秒）',
        dataIndex: 'speed',
        key: 'speed',
        // render: (text) => this.statusIcon(text),
      },
      {
        title: '处理结果',
        dataIndex: 'result',
        key: 'result',
      },
      {
        title: '结果描述',
        dataIndex: 'description',
        key: 'description',
      },
    ];

    return (
      <PageHeaderLayout title="ETL日志">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Row>
              <div className={styles.tableListForm}>{this.renderForm()}</div>
              <Col offset={1} md={4} sm={24}>
                <Row>
                  <Col md={11} sm={24}>
                    {/* <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                        添加
                    </Button> */}
                  </Col>
                  <Col offset={2} md={11} sm={24}>
                    {/* <Dropdown overlay={menu}>
                      <Button>
                        批量操作 <Icon type="down" />
                      </Button>
                    </Dropdown> */}
                  </Col>
                </Row>
              </Col>
            </Row>
            <StandardTable
              loading={loading}
              data={dataSource}
              columns={columns}
              hasRowSelection={false}
              alter={false}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
