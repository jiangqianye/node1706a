import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button } from 'antd';
import StandardTable from 'components/StandardTable';
import ZxTree from 'zxComponents/zxTree';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from '../common.less';

const FormItem = Form.Item;
const { Search } = Input;

@connect(({ systemLog, loading }) => ({
  systemLog,
  loading: loading.models.systemLog,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    formValues: {},
  };
  // 初始化页面数据
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemLog/fetch',
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
      type: 'systemLog/fetch',
      payload: params,
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
        type: 'systemLog/fetch',
        payload: values,
      });
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
      type: 'systemLog/fetch',
      payload: {},
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
    const { systemLog: { data }, loading } = this.props;

    const columns = [
      { title: '序号', dataIndex: 'key' },
      { title: '发生日期', dataIndex: 'happenDate' },
      { title: '客户端IP', dataIndex: 'clientIP' },
      { title: '操作用户', dataIndex: 'operateUser' },
      { title: '模块名称', dataIndex: 'moduleName' },
      { title: '操作内容', dataIndex: 'operateContent' },
      { title: '参数', dataIndex: 'param' },
    ];

    return (
      <PageHeaderLayout title="系统日志">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>

            <div className={styles.tableListOperator}>{null}</div>

            <StandardTable
              loading={loading}
              data={data}
              columns={columns}
              hasRowSelection={false}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>

        <ZxTree />
      </PageHeaderLayout>
    );
  }
}
