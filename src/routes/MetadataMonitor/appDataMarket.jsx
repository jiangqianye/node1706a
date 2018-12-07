import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Tabs, Form, Row, Col, Button, Card, Spin } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../common.less';

const FormItem = Form.Item;
const { Search } = Input;
const { TabPane } = Tabs;

@connect(({ appDataMarket, loading }) => ({
  appDataMarket,
  loading: loading.models.appDataMarket,
}))
@Form.create()
class Index extends PureComponent {
  static propTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.questData();
  }
  // 请求数据的action，
  questData(
    searchValue = this.props.appDataMarket.searchValue,
    type = this.props.appDataMarket.type,
    subType = this.props.appDataMarket.subType,
    params = this.props.appDataMarket.params
  ) {
    const { dispatch } = this.props;
    dispatch({
      type: 'appDataMarket/fetch',
      payload: { type, subType, searchValue, params },
    });
  }

  // 搜索框事件
  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.questData(fieldsValue);
    });
  };

  // 分页改变事件
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const pageParams = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    this.questData(null, null, null, pageParams);
  };
  // 表单重置事件
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.questData('');
  };

  // 父tab改变事件
  parentTabChange(type) {
    this.questData(null, type);
  }
  // 子Tab改变事件
  childTabChnage(subType) {
    this.questData(null, null, subType);
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
    const { type, subType } = this.props.appDataMarket;
    let doms = [];
    if (Array.isArray(datas) && datas.length > 0) {
      datas.forEach(item => {
        if (item.children.length > 0) {
          doms.push(
            <TabPane tab={item.tab} key={item.key}>
              <Tabs
                tabBarGutter={5}
                activeKey={subType}
                onChange={this.childTabChnage.bind(this)}
                type="card"
              >
                {item.children.map(child => {
                  return (
                    <TabPane tab={child.tab} key={child.key}>
                      {this.renderTable(child.content)}
                    </TabPane>
                  );
                })}
              </Tabs>
            </TabPane>
          );
        } else {
          doms.push(
            <TabPane tab={item.tab} key={item.key}>
              {this.renderTable(item.content)}
            </TabPane>
          );
        }
      });
      return (
        <Tabs
          activeKey={type}
          onChange={this.parentTabChange.bind(this)}
          tabPosition="left"
          style={{ height: 400 }}
          tabBarGutter={5}
        >
          {doms}
        </Tabs>
      );
    } else {
      return null;
    }
  }

  renderTable(data) {
    const { loading } = this.props;
    const columns = [
      { title: '序号', width: 50, dataIndex: 'key', key: 'key', className: 'color:red' },
      {
        title: '指标名称',
        dataIndex: 'name',
        width: 100,
        key: 'name',
      },
      { title: '指标说明', width: 100, dataIndex: 'describe', key: 'describe' },
      { title: '映射字段名', width: 100, dataIndex: 'field', key: 'field' },
    ];
    return (
      <StandardTable
        loading={loading}
        data={data}
        columns={columns}
        hasRowSelection={false}
        onChange={this.handleStandardTableChange.bind(this)}
      />
    );
  }

  render() {
    const { data } = this.props.appDataMarket;
    // const { loading } = this.props;
    return (
      <PageHeaderLayout title="应用数据集市">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            {this.renderTabPane(data)}
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
export default Index;

/*

  {this.renderTabPane(tabpanes)}
  */
