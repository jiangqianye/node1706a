import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button } from 'antd';
import StandardTable from 'components/StandardTable';
import ZxIcon from 'zxComponents/ZxIcon';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';

const FormItem = Form.Item;
const { Search } = Input;

@connect(({ dataOperationState, loading }) => ({
  dataOperationState,
  loading: loading.models.dataOperationState,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dataOperationState/fetch',
    });
  }

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      this.setState({
        formValues: fieldsValue,
      });
      if (err) return;
      dispatch({
        type: 'dataOperationState/fetch',
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
      type: 'dataOperationState/fetch',
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
      type: 'dataOperationState/fetch',
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
    const { dataOperationState: { data }, loading } = this.props;

    const columns = [
      { title: '数据源名称', dataIndex: 'sourceName', key: 'sourceName' },
      { title: '描述', dataIndex: 'describe', key: 'describe' },
      { title: '数据库类型', dataIndex: 'databaseType', key: 'databaseType' },
      { title: '用户名', dataIndex: 'userName', key: 'userName' },
      { title: '系统名称', dataIndex: 'systemName', key: 'systemName' },
      { title: '连接检测时间', dataIndex: 'linkTestTime', key: 'linkTestTime' },
      {
        title: '连接状态',
        dataIndex: 'status',
        key: 'status',
        render: text => <ZxIcon title={text} />,
      },
    ];

    return (
      <PageHeaderLayout title="数据运营状态">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              loading={loading}
              data={data}
              columns={columns}
              hasRowSelection={false}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
