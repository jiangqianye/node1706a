import mockjs from 'mockjs';
import { parse } from 'url';

// const { Random } = mockjs;
// getParamList, getParamInfo, postParam

const categories = [
  { value: '1', label: '系统算法接口' },
  { value: '2', label: '日志管理' },
  { value: '3', label: '日志管理1' },
];

const paramDataSource = mockjs.mock({
  'result|20': [
    {
      'key|+1': 1,
      'category|1': categories,
      paramName: '@word',
      paramValue: '@word',
      remark: '@word',
    },
  ],
});

export function getParamList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let dataSource = [...paramDataSource.result];
  // 搜索
  if (params.searchValue) {
    dataSource = dataSource.filter(data => data.categoryName.indexOf(params.searchValue) > -1);
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

export function getParamInfo(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let dataSource = [...paramDataSource.result];

  // 根据 key 获取用户信息
  if (params.key) {
    dataSource = dataSource.filter(data => String(data.key) === String(params.key));
    dataSource = dataSource.length > 0 ? dataSource[0] : null;
  }
  const result = { ...dataSource };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function postParam(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, keys, addData } = body;
  let dataSource = [...paramDataSource.result];

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      // 每次都会重新获取数据，因此只能模拟删除一次
      if (Array.isArray(keys) && keys.length > 0) {
        keys.forEach(key => {
          dataSource = dataSource.filter(item => item.key !== key);
        });
      }
      break;
    case 'post':
      const exitCate = categories.filter(item => item.value === addData.category);
      if (exitCate.length > 0) {
        addData.category = exitCate[0];
      }
      if (addData.key) {
        dataSource = dataSource.map(item => {
          if (String(item.key) === String(addData.key)) {
            item = addData;
          }
          return item;
        });
      } else {
        const i = Math.ceil(Math.random() * 10000);
        dataSource.unshift({
          key: i,
          ...addData,
        });
      }
      break;
    default:
      break;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
