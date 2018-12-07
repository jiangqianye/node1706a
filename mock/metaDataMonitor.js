import mockjs from 'mockjs';
import { parse } from 'url';

const { Random } = mockjs;
const dataOperatedState = mockjs.mock({
  'result|20': [
    {
      'key|+1': 1,
      'sourceName|+1': ['数据集市层', '数据标准层', '南光1', 'huiyikang2', 'huiyikang'],
      'describe|+1': ['19张表', 'huiyikang2', 'huiyikang2', 'huiyikang'],
      'databaseType|+1': ['SqlServer', 'mySQL'],
      'userName|+1': ['sa', 'root'],
      'systemName|+1': ['应用数据集市层', '数据标准层', '系统名称1'],
      linkTestTime: Random.datetime(),
      'status|+1': ['连接正常', '连接异常'],
    },
  ],
});
const dataStorageState = mockjs.mock({
  'result|20': [
    {
      'key|+1': 1,
      'database|+1': ['数据集市层', '数据标准层', '数据集市层1', '数据标准层1'],
      'system|+1': ['应用数据集市层1', '数据标准层2', '数据集市层3', '数据标准层4'],
      'capacity|+1': [
        { total: 36630.0, percent: `8.4%` },
        { total: 100, percent: '20%' },
        { total: 0, percent: '0' },
      ],
      'capacityState|1': ['正常', '异常'],
    },
  ],
});

export const sdLayertabPanes = [
  { key: '1', tab: '参与者主题域', children: [] },
  { key: '2', tab: '医疗服务主题域', children: [] },
  { key: '3', tab: '医疗事件主题域', children: [] },
  { key: '4', tab: '费用主题域', children: [] },
  { key: '5', tab: '事件主题域', children: [] },
  { key: '6', tab: '值域', children: [] },
];

const sdLayerdataSource = mockjs.mock({
  'result|6': [
    {
      'key|+1': 1,
      'tabKey|+1': 1,
      'dataSource|10-20': [
        {
          'key|+1': 1,
          tableName: '@string(7, 10)',
          describe: '@string(7, 10)',
          comment: '@string(7, 10)',
        },
      ],
    },
  ],
});
const sdLayerDetail = mockjs.mock({
  'result|10': [
    {
      'key|+1': 1,
      'tableKey|+1': 1,
      'dataSource|10-20': [
        {
          'key|+1': 1,
          'fieldName|+1': '@ctitle(5)',
          'cName|+1': '@ctitle(5)',
          'fieldType|+1': '@ctitle(5)',
          'isNull|+1': '@ctitle(5)',
          'relative|+1': '@string(7, 10)',
        },
      ],
    },
  ],
});

// 应用数据集市
const appDataMarketTypes = [
  {
    key: '1',
    tab: '患者人次',
    children: [
      { key: '1.1', tab: '门诊人次', content: [] },
      { key: '1.2', tab: '急诊人次', content: [] },
      { key: '1.3', tab: '住院人次', content: [] },
      { key: '1.4', tab: '全院人次', content: [] },
    ],
  },
  {
    key: '2',
    tab: '患者费用',
    children: [
      { key: '2.1', tab: '门诊费用情况', content: [] },
      { key: '2.2', tab: '急诊费用情况', content: [] },
      { key: '2.3', tab: '住院费用情况', content: [] },
      { key: '2.4', tab: '全院费用情况', content: [] },
      { key: '2.5', tab: '费用占比', content: [] },
    ],
  },
  { key: '3', tab: '床位效率', children: [], content: [] },
  {
    key: '4',
    tab: '工作质量',
    children: [
      { key: '4.1', tab: '住院工作质量', content: [] },
      { key: '4.2', tab: '门急诊工作质量', content: [] },
      { key: '4.3', tab: '手术情况', content: [] },
      { key: '4.4', tab: '其他工作质量', content: [] },
      { key: '4.5', tab: '检查检验情况', content: [] },
    ],
  },
  { key: '5', tab: '保险情况', children: [], content: [] },
];

const appDataMarketDatas = [
  {
    key: '1',
    type: '1',
    subType: '1.1',
    dataSource: [
      { key: '1', name: '指标名称1', describe: '指标说明1', field: '映射字段名1' },
      { key: '2', name: '指标名称2', describe: '指标说明2', field: '映射字段名2' },
    ],
  },
  { key: '2', type: '1', subType: '1.2', dataSource: [] },
];

const dataStandProcess = [];

export function getDataOperationState(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let dataSource = [...dataOperatedState.result];
  // 搜索
  if (params.searchValue) {
    dataSource = dataSource.filter(data => data.sourceName.indexOf(params.searchValue) > -1);
  }
  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize: parseInt(params.pageSize, 10) || 10,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function getDataStorageState(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  const dataSource = [...dataStorageState.result];

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize: parseInt(params.pageSize, 10) || 10,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function getStandDataLayer(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let dataSource = [...sdLayerdataSource.result];

  if (params.activeTab) {
    dataSource = dataSource.filter(item => String(item.tabKey) === String(params.activeTab));
  }
  const result = {
    list: dataSource[0].dataSource,
    pagination: {
      total: dataSource[0].dataSource.length,
      pageSize: parseInt(params.pageSize, 10) || 10,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function getsdLayerDetail(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let dataSource = [...sdLayerDetail.result];

  if (params.tableKey) {
    dataSource = dataSource.filter(item => item.tableKey === params.tableKey);
  }
  const result = {
    list: dataSource[0].dataSource,
    pagination: {
      total: dataSource[0].dataSource.length,
      pageSize: parseInt(params.pageSize, 10) || 10,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export const getAppDataMarket = (req, res, u) => {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let result = null;
  let datas = {
    list: [],
    pagination: {
      total: 0,
      pageSize: parseInt(params.pageSize, 10) || 10,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };
  // 搜索
  if (params.type && params.subType) {
    const exitappDataMarketDatas = appDataMarketDatas.filter(
      item => item.type === params.type && item.subType === params.subType
    );
    if (exitappDataMarketDatas.length > 0) {
      datas = {
        list: exitappDataMarketDatas[0].dataSource,
        pagination: {
          total: exitappDataMarketDatas[0].dataSource.length,
          pageSize: parseInt(params.pageSize, 10) || 10,
          current: parseInt(params.currentPage, 10) || 1,
        },
      };
    }

    result = appDataMarketTypes.map(item => {
      let { content, children } = item;
      if (item.key === params.type) {
        if (item.children.length > 0) {
          children = item.children.map(child => {
            let childContent = child.content;
            if (child.key === params.subType) {
              childContent = datas;
            }
            return { ...child, content: childContent };
          });
        } else {
          content = datas;
        }
      }
      return { ...item, content, children };
    });
  }

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
};

export const getdataStandProcess = (req, res, u) => {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  const dataSource = [...dataStandProcess.result];

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize: parseInt(params.pageSize, 10) || 10,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
};

export const getMetaDataMonitor = {
  // 数据运营状态
  getDataOperationState,
  // 数据存储状态
  getDataStorageState,
  // 数据标准化流程
  getdataStandProcess,
  // 应用数据集市
  getAppDataMarket,
  // 标准数据层
  sdLayertabPanes,
  getStandDataLayer,
  getsdLayerDetail,
};
