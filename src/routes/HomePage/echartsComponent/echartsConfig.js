const echarts = require('echarts/lib/echarts'); // 必须
require('echarts/lib/chart/pie'); // 图表类型-饼图
require('echarts/lib/component/title'); // 标题插件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');

export const echartsConfig = (dom, dataSource) => {
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
  } = dataSource;

  const myChart = echarts.init(dom);
  const option = {
    title: {
      text: 'ETL成功率',
      subtext: successPercent,
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
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    series: [
      {
        name: 'ETL',
        type: 'pie',
        radius: ['80%', '90%'],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: notRun, name: '未运行' },
          { value: running, name: '运行中' },
          { value: success, name: '运行成功', itemStyle: { color: '#eac52d' } },
          { value: fail, name: '运行失败', itemStyle: { color: 'gainsboro' } },
        ],
      },
    ],
  };

  if (option && typeof option === 'object') {
    myChart.setOption(option, true);
  }
};

/*

*/
