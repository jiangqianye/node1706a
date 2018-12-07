import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import { Row, Col, Card, Form, Input, Button } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import StructStandModal from './components/structStandModal';

import styles from '../common.less';

const FormItem = Form.Item;
const { Search } = Input;

@connect(({ structStandDetailList, loading }) => ({
  structStandDetailList,
  loading: loading.models.structStandDetailList,
}))
@Form.create()
export default class StructStandDetailList extends PureComponent {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'structStandDetailList/fetch',
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
        type: 'structStandDetailList/fetch',
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
      type: 'structStandDetailList/fetch',
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
      type: 'structStandDetailList/fetch',
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
    const { selectedRows } = this.state;
    const { structStandDetailList, loading } = this.props;
    const { dataSource } = structStandDetailList;
    const columns = [
      // { title: '序号', dataIndex: 'index', key: 'index' },
      { title: '表名(目标)', dataIndex: 'tableNameTarget', key: 'tableNameTarget' },
      {
        title: '映射表数量(源)',
        dataIndex: 'tableNum',
        key: 'tableNum',
      },
      { title: '列总数(目标)', dataIndex: 'rowNumTotal', key: 'rowNumTotal' },
      {
        title: '映射列数量(目标)',
        dataIndex: 'rowNum',
        key: 'rowNum',
      },
      {
        title: '操作',
        render: () => (
          <Button type="primary">
            <Link to="/structStand/checkTargetTable">查看详情</Link>
          </Button>
        ),
      },
    ];

    return (
      <PageHeaderLayout title="结构标准化">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              {/* <Button icon='plus' type="primary" onClick={() => this.handleModalVisible(true)}>
                新增
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
              data={dataSource}
              columns={columns}
              hasRowSelection
              onChange={this.handleStandardTableChange}
              onSelectRow={this.onSelectRow}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
