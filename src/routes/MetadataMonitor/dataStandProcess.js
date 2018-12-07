import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
// import { connect } from 'dva';
// import { Row, Col, Card, Form, Input, Button,Progress } from 'antd';
// import StandardTable from 'components/StandardTable';
// import ZxIcon from 'zxComponents/ZxIcon';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';

@connect(({ dataStandProcess, loading }) => ({
  dataStandProcess,
  loading: loading.models.dataStandProcess,
}))
export default class Index extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <PageHeaderLayout title="数据标准化流程">
        <Card bordered={false}>
          <div className={styles.tableList}>数据标准化流程</div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
