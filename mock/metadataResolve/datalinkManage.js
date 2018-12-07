import mockjs from 'mockjs';
import { parse } from 'url';

const tableListDataSource = mockjs.mock({
  'list|200': [
    {
      'key|+1': 1,
      'index|+1': 1,
      'currentName|+1': '@ctitle(5)',
      'parentName|+1': '@ctitle()',
      'type|+1': ['1', '2', '3', '4', '5'],
    },
  ],
});
// 获取列表数据
export function getDataLinkManageList(req, res, u) {
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
// 删除列表数据
export function postDataLinkManageList(req, res, u, b) {
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
          index: i,
          ...formData,
          // runState:'fwafeawe',
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
