import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Progress } from 'antd';
import StandardTable from 'components/StandardTable';
import ZxIcon from 'zxComponents/ZxIcon';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';

const FormItem = Form.Item;
const { Search } = Input;

@connect(({ dataStorageState, loading }) => ({
  dataStorageState,
  loading: loading.models.dataStorageState,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dataStorageState/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'dataStorageState/fetch',
      payload: params,
    });
  };

  render() {
    const { dataStorageState: { data }, loading } = this.props;

    const columns = [
      { title: '数据库名称', dataIndex: 'database', key: 'database' },
      { title: '系统名称', dataIndex: 'system', key: 'system' },
      {
        title: '容量',
        dataIndex: 'capacity',
        key: 'capacity',
        render: text => (
          <Progress percent={Number(text.percent.slice(0, text.percent.indexOf('%')))} />
        ),
      },
      {
        title: '容量状态',
        dataIndex: 'capacityState',
        key: 'capacityState',
        render: text => <ZxIcon title={text} />,
      },
    ];

    return (
      <PageHeaderLayout title="数据存储状态">
        <Card bordered={false}>
          <div className={styles.tableList}>
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
