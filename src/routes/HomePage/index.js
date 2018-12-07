import React, { Component } from 'react';
import { Row, Col, Card, Table, Progress } from 'antd';
import { connect } from 'dva';
import ZxIcon from 'zxComponents/ZxIcon';
import AntvComponent from './antvComponent';
import EtlMonitor from './etlMonitor';

@connect(({ homePage, loading }) => ({
  homePage,
  loading: loading.effects['homePage/fetch'],
}))
class Index extends Component {
  static propTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'homePage/fetch',
      payload: {},
    });
  }
  componentDidMount() {}
  // 处理数据运营状态数据
  dealdataOperatedState(datas) {
    const { dataSource } = datas;
    const newDataSource = dataSource.map(item => {
      return {
        ...item,
        connectState: <ZxIcon title={item.connectState} />,
        stateCollect: <ZxIcon title={item.stateCollect} />,
      };
    });
    return { ...datas, dataSource: newDataSource };
  }
  // 处理数据运营状态数据
  dealdataStorageState(datas) {
    const { dataSource } = datas;
    const newDataSource = dataSource.map(item => {
      return {
        ...item,
        content: (
          <Progress percent={Number(item.content.slice(0, 2))} size="small" status="active" />
        ),
        contentState: <ZxIcon title={item.contentState} />,
      };
    });
    return { ...datas, dataSource: newDataSource };
  }
  // <Progress percent={50} size="small" status="active" />
  render() {
    const { dataOperatedState, dataStorageState, logicRelative, etlMonitor } = this.props.homePage;
    const newDataOperatedState = this.dealdataOperatedState(dataOperatedState);
    const newDataStorageState = this.dealdataStorageState(dataStorageState);
    return (
      <div>
        <Row gutter={8}>
          <Col span={12}>
            <Card title="数据运营状态" extra={<a>详情</a>} style={{ height: '300px' }}>
              <Table
                {...newDataOperatedState}
                scroll={{ y: 155 }}
                pagination={false}
                size="small"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="数据存储状态" extra={<a>详情</a>} style={{ height: '300px' }}>
              <Table {...newDataStorageState} scroll={{ y: 155 }} pagination={false} size="small" />
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={12}>
            <Card title="逻辑关系图">
              <AntvComponent dataSource={logicRelative} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="ETL任务监控" extra={<a>详情</a>}>
              <EtlMonitor dataSource={etlMonitor} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Index;
