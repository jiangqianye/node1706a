import mockjs from 'mockjs';
import { parse } from 'url';

const tableListDataSource = mockjs.mock({
  'list|200': [
    {
      'key|+1': 1,
      'mapName|+1': '@ctitle()',
      'sourcePath|+1': '@ctitle()',
      'mode|+1': '@ctitle()',
      'runState|+1': '@ctitle()',
      'opereate|+1': '@ctitle()',
    },
  ],
});
// 获取列表数据
export function getEtlConfigList(req, res, u) {
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
// 搜索单独一条数据
export function getEtlConfigDetailById(req, res, u) {
  let dataList = [...tableListDataSource.list];
  let etlConfigInfo = null;

  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;

  if (params.key) {
    etlConfigInfo = dataList.filter(item => String(item.key) === String(params.key));

    etlConfigInfo = etlConfigInfo.length > 0 ? etlConfigInfo[0] : null;
  }
  if (res && res.json) {
    res.json(etlConfigInfo);
  } else {
    return etlConfigInfo;
  }
}
// 增删改 列表数据
export function postEtlConfigList(req, res, u, b) {
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
