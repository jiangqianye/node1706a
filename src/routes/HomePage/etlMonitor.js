import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import ZxIcon from 'zxComponents/ZxIcon';
import EchartsComponent from './echartsComponent';
import styles from './index.less';

export default class EtlMonitor extends Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    const {
      success,
      successPercent,
      fail,
      failPercent,
      running,
      runningPercent,
      notRun,
      notRunPercent,
      taskTotal,
    } = this.props.dataSource;
    const data = [
      { key: 1, state: <ZxIcon title="未运行" />, percent: notRunPercent, number: notRun },
      { key: 2, state: <ZxIcon title="运行中" />, percent: runningPercent, number: running },
      { key: 3, state: <ZxIcon title="运行成功" />, percent: successPercent, number: success },
      { key: 4, state: <ZxIcon title="运行失败" />, percent: failPercent, number: fail },
    ];
    return (
      <div className={styles.etl_monitor}>
        <EchartsComponent
          className={styles.etl_monitor_echarts}
          dataSource={this.props.dataSource}
        />
        <div className={styles.etl_monitor_describ}>
          <div className={styles.etl_monitor_describ_item}>
            <h3 style={{ fontWeight: 'blod' }}>任务总数</h3>
          </div>
          <div className={styles.etl_monitor_describ_item}>
            <h2 style={{ fontWeight: 'blod' }}>{taskTotal}</h2>
          </div>
          {data.map(item => {
            return (
              <div className={styles.etl_monitor_describ_item} key={item.key}>
                <div className={styles.etl_monitor_describ_item_a}>{item.state}</div>
                <div className={styles.etl_monitor_describ_item_a}>({item.percent})</div>
                <div className={styles.etl_monitor_describ_item_a}>{item.number}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
