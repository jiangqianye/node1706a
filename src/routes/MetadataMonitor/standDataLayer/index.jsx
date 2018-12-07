import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Tabs, Form, Row, Col, Button, Card, Spin } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../common.less';
import CusTomModal from './customModal';

const FormItem = Form.Item;
const { Search } = Input;
const { TabPane } = Tabs;

@connect(({ standDataLayer, loading }) => ({
  standDataLayer,
  loading: loading.models.standDataLayer,
}))
@Form.create()
class Index extends PureComponent {
  static propTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      formValues: null,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'standDataLayer/fetch',
    });
  }

  // 搜索框事件
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      this.setState({
        formValues: fieldsValue,
      });
      if (err) return;
      // dispatch({
      //   type: 'dataOperationState/fetch',
      //   payload: fieldsValue,
      // });
    });
  };

  // 分页改变事件
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { activeTab } = this.props.standDataLayer;
    const { formValues } = this.state;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };
    dispatch({
      type: 'standDataLayer/fetch',
      payload: { ...params, activeTab },
    });
  };
  // 表单重置事件
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'standDataLayer/fetch',
    });
  };
  // 左侧tab栏改变事件
  handleLeftTabChange(activeTab) {
    const { dispatch } = this.props;
    dispatch({
      type: 'standDataLayer/fetch',
      payload: { activeTab },
    });
  }

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

  renderTabPane(datas) {
    const { activeTab } = this.props.standDataLayer;
    let doms = [];
    if (Array.isArray(datas) && datas.length > 0) {
      doms = datas.map(item => {
        return (
          <TabPane tab={item.tab} key={item.key}>
            {this.renderTable(activeTab)}
          </TabPane>
        );
      });
      return (
        <Tabs
          activeKey={activeTab}
          onChange={this.handleLeftTabChange.bind(this)}
          tabPosition="left"
          // style={{ height: 400 }}
          tabBarGutter={5}
        >
          {doms}
        </Tabs>
      );
    } else {
      return null;
    }
  }

  renderTable(tabName = '') {
    const { loading } = this.props;
    const { dataSource } = this.props.standDataLayer;
    const columns = [
      { title: '序号', width: 50, dataIndex: 'key', key: 'key', className: 'color:red' },
      {
        title: tabName === '值域' ? '值域于代码编号' : '表名',
        dataIndex: 'tableName',
        width: 100,
        key: 'tableName',
        render: (text, record) => (
          <CusTomModal btnName={text} title="自己的标题" {...this.props} tableKey={record.key} />
        ),
      },
      { title: '含义', width: 100, dataIndex: 'describe', key: 'describe' },
      { title: '备注', width: 100, dataIndex: 'comment', key: 'comment' },
    ];
    return (
      <StandardTable
        loading={loading}
        data={dataSource}
        columns={columns}
        hasRowSelection={false}
        onChange={this.handleStandardTableChange.bind(this)}
      />
    );
  }

  render() {
    const { tabpanes } = this.props.standDataLayer;
    const { loading } = this.props;
    return (
      <PageHeaderLayout title="数据标准层">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            {this.renderTabPane(tabpanes)}
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
export default Index;
