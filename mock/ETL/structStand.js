import mockjs from 'mockjs';
import { parse } from 'url';

const tableListDataSource = mockjs.mock({
  'list|100': [
    {
      'key|+1': 1,
      'mapName|+1': '@ctitle(5)',
      'dataSourceNameSource|+1': '@ctitle(5)',
      'dataSourceNameTarget|+1': '@ctitle(5)',
      'tableNumberSource|1-100': 100,
      'tableNumberTarget|1-100': 100,
      'mapState|+1': '@ctitle(5)',
      // 'selfOperate|+1': ['状态'],
    },
  ],
});
// 获取列表数据
export function getStructStandList(req, res, u) {
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
// 增删改 列表数据
export function postStructStandList(req, res, u, b) {
  let dataList = [...tableListDataSource.list];

  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, selectedRows, pageSize, currentPage } = body;
  const { formData } = body;
  switch (method) {
    case 'delete':
      if (Array.isArray(selectedRows) && selectedRows.length > 0) {
        selectedRows.forEach(key => {
          dataList = dataList.filter(item => item.key !== key);
        });
      }
      break;
    case 'add':
      if (formData) {
        const key = Math.ceil(Math.random() * 10000);
        dataList.unshift({
          key,
          ...formData,
          dataSourceNameSource: '数据标准层',
          dataSourceNameTarget: '状态',
          mapState: '状态',
        });
      }
      break;
    case 'update':
      if (formData.key) {
        dataList = dataList.forEach(item => {
          if (item.key === formData.key) {
            item = formData;
          }
          return item;
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
