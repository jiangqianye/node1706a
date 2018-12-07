import mockjs from 'mockjs';
import { parse } from 'url';

const tableListDataSource = mockjs.mock({
  'list|200': [
    {
      'key|+1': 1,
      'mapName|+1': '@ctitle()',
      'sourcePath|+1': '@ctitle()',
      'mode|+1': ['afds', 'afdfadsfs'],
      'runState|+1': ['1', '2', '3', '4'],
      'remark|+1': ['1'],
    },
  ],
});
// 获取列表数据
export function getMonitorList(req, res, u) {
  let dataList = [...tableListDataSource.list];

  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;
  if (params.searchValue) {
    dataList = dataList.filter(item => item.mapName === params.searchValue);
  }
  const result = {
    dataSource: {
      list: dataList,
      pagination: {
        total: dataList.length,
        pageSize: parseInt(params.pageSize, 10) || 10,
        current: parseInt(params.currentPage, 10) || 1,
      },
    },
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
// 搜索单条数据详情
export function getMonitorDetailById(req, res, u) {
  let dataList = [...tableListDataSource.list];
  let monitorInfo = null;

  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;

  if (params.key) {
    monitorInfo = dataList.filter(item => String(item.key) === String(params.key));

    monitorInfo = monitorInfo.length > 0 ? monitorInfo[0] : null;
  }
  if (res && res.json) {
    res.json(monitorInfo);
  } else {
    return monitorInfo;
  }
}
// 增删改 列表数据
export function postMonitorList(req, res, u, b) {
  let dataList = [...tableListDataSource.list];

  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, selectedRows, pageSize, currentPage, formData } = body;
  switch (method) {
    case 'delete':
      if (Array.isArray(selectedRows) && selectedRows.length > 0) {
        selectedRows.forEach(key => {
          dataList = dataList.filter(item => item.key !== key);
        });
      }
      break;
    case 'addOrUpdate':
      if (formData.key) {
        dataList = dataList.map(item => {
          if (String(item.key) === String(formData.key)) {
            item = formData;
          }
          return item;
        });
      } else {
        const i = Math.ceil(Math.random() * 10000);
        dataList.unshift({
          key: i,
          ...formData,
          runState: 'fwafeawe',
        });
      }
      break;

    default:
      break;
  }
  const result = {
    dataSource: {
      list: dataList,
      pagination: {
        total: dataList.length,
        pageSize: parseInt(pageSize, 10) || 10,
        current: currentPage || 1,
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
