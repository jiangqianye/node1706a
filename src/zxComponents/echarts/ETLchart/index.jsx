import React, { PureComponent } from 'react';
import * as echarts from 'echarts';
class Index extends PureComponent {
  static propTypes = {};

  static defaultProps = {
    etlChart: {
      successNum: 1,
      errorNum: 2,
    },
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { etlChart } = this.props;
    const { successNum, errorNum } = etlChart;
    this.initData(successNum, errorNum);
  }

  componentWillReceiveProps(props, nextProps) {}
  initData(success, error) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.refs.ETlChart);
    let text = `${(success / (success + error)).toFixed(2) * 100}%`;
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ETL成功率',
        subtext: text,
        x: 'center',
        y: 'center',
        itemGap: 20,
        textStyle: {
          // fontFamily : '微软雅黑',
          fontSize: 20,
        },
        subtextStyle: {
          fontSize: 28,
        },
      },
      tooltip: {
        show: true,
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
        {
          name: 'ETL成功率',
          type: 'pie',
          clockWise: false,
          radius: [80, 90],
          itemStyle: {
            label: { show: false },
            labelLine: { show: false },
          },
          label: { show: false },
          labelLine: { show: false },
          data: [
            {
              //成功的概率
              value: success,
              name: '成功的个数',
            },
            {
              //失败的概率
              value: error,
              name: '未成功的个数',
              itemStyle: {
                normal: {
                  //反向的颜色
                  color: '#E5E9F2',
                  label: { show: false },
                  labelLine: { show: false },
                },
                emphasis: {
                  color: '#E5E9F2',
                },
              },
            },
          ],
        },
      ],
      color: ['#eac52d'],
    });
  }
  render() {
    return <div ref="ETlChart" style={{ width: '90%', height: 200 }} />;
  }
}
export default Index;
