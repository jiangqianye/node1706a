import mockjs from 'mockjs';
import { parse } from 'url';

export const getHomePageDatas = {
  // 数据运营状态
  dataOperatedState: {
    columns: [
      {
        title: '数据源名称',
        dataIndex: 'dataSourceName',
        key: 'dataSourceName',
        width: 100,
      },
      {
        title: '连接状态',
        dataIndex: 'connectState',
        key: 'connectState',
        width: 70,
      },
      {
        title: '状态汇总',
        dataIndex: 'stateCollect',
        key: 'stateCollect',
        width: 70,
      },
    ],
    dataSource: [
      {
        key: '1',
        dataSourceName: '名称1',
        connectState: '连接正常',
        stateCollect: '连接正常(2)',
      },
      {
        key: '2',
        dataSourceName: '应用数据集市层',
        connectState: '连接正常',
        stateCollect: '异常运行(4)',
      },
      {
        key: '3',
        dataSourceName: '数据标准层',
        connectState: '连接正常',
        stateCollect: '未知状态(4)',
      },
      {
        key: '4',
        dataSourceName: '应用数据集市层',
        connectState: '连接正常',
        stateCollect: '连接正常(4)',
      },
    ],
  },
  // 数据存储状态
  dataStorageState: {
    columns: [
      {
        title: '数据库名称',
        dataIndex: 'database',
        key: 'database',
        width: 110,
      },
      {
        title: '系统名称',
        dataIndex: 'system',
        key: 'system',
        width: 110,
      },
      {
        title: '容量',
        dataIndex: 'content',
        key: 'content',
        width: 120,
      },
      {
        title: '容量状态',
        dataIndex: 'contentState',
        key: 'contentState',
        width: 80,
      },
    ],
    dataSource: [
      {
        key: '1',
        database: '应用数据集市层',
        system: '数据标准层',
        content: '90%',
        contentState: '正常',
      },
      {
        key: '2',
        database: '应用数据集市层',
        system: '	应用数据集市层',
        content: '30%',
        contentState: '正常',
      },
    ],
  },
  /* 逻辑关系图 */
  logicRelative: {
    nodes: [
      {
        id: 23,
        title: '应用数据集市层',
        imgPath: 'https://zos.alipayobjects.com/rmsportal/FDWrsEmamcNvtEf.png',
        shape: 'iconNet',
      },
      {
        id: 24,
        title: '数据标准层',
        imgPath: 'https://zos.alipayobjects.com/rmsportal/GHGrgIDTVMCaYZT.png',
        shape: 'iconNet',
      },
      {
        id: 25,
        title: 'H厂商',
        imgPath: 'https://zos.alipayobjects.com/rmsportal/nAVchPnSaAWncPj.png',
        shape: 'iconNet',
      },
      {
        id: 26,
        title: 'D厂商',
        imgPath: 'https://zos.alipayobjects.com/rmsportal/nAVchPnSaAWncPj.png',
        shape: 'iconNet',
      },
      {
        id: 27,
        title: 'HC厂商',
        imgPath: 'https://zos.alipayobjects.com/rmsportal/nAVchPnSaAWncPj.png',
        shape: 'iconNet',
      },
    ],
    edges: [
      { source: 24, target: 23, shape: 'arrow' },
      { source: 25, target: 24, shape: 'arrow' },
      { source: 26, target: 24, shape: 'arrow' },
      { source: 27, target: 24, shape: 'arrow' },
    ],
  },
  /* ETL监控 */
  etlMonitor: {
    success: 7,
    fail: 2,
    running: 0,
    notRun: 0,
    taskTotal: 9,
  },
};
// ------------"指标"-树形的数据
export const quotaTreeData = [
  {
    title: '财务类',
    key: '0-0',
    children: [
      {
        title: '门诊费用',
        key: '0-0-0',
        children: [
          { title: '门诊总费用', key: '0-0-0-0' },
          { title: '门诊药品总费用', key: '0-0-0-1' },
          { title: '门诊西药费用', key: '0-0-0-2' },
          { title: '门诊中药费用', key: '0-0-0-3' },
          { title: '门诊手术费用', key: '0-0-0-4' },
          { title: '门诊治疗及其他费用', key: '0-0-0-5' },
          { title: '门诊卫生材料费用', key: '0-0-0-6' },
          { title: '门诊诊查费', key: '0-0-0-7' },
          { title: '门诊床位费', key: '0-0-0-8' },
          { title: '门诊放射检查费', key: '0-0-0-9' },
          { title: '门诊麻醉费', key: '0-0-0-10' },
          { title: '门诊治疗费', key: '0-0-0-11' },
        ],
      },
      { title: '急诊费用', key: '0-0-1', children: [] },
      { title: '住院费用', key: '0-0-2', children: [] },
      { title: '其他费用', key: '0-0-3', children: [] },
      { title: '全院费用', key: '0-0-4', children: [] },
      { title: '成本效率', key: '0-0-5', children: [] },
      { title: '门特费用', key: '0-0-6', children: [] },
    ],
  },
  {
    title: '工作类',
    key: '0-1',
    children: [
      { title: '门诊费用', key: '0-1-0', children: [] },
      { title: '急诊费用', key: '0-1-1', children: [] },
      { title: '住院费用', key: '0-1-2', children: [] },
      { title: '其他费用', key: '0-1-3', children: [] },
      { title: '全院费用', key: '0-1-4', children: [] },
      { title: '成本效率', key: '0-1-5', children: [] },
      { title: '门特费用', key: '0-1-6', children: [] },
    ],
  },
];
