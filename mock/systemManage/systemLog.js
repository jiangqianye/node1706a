import mockjs from 'mockjs';
import { parse } from 'url';

const systemLogDataSource = mockjs.mock({
  'result|20': [
    {
      'key|+1': 1,
      'happenDate|1': '@datetime',
      'clientIP': '@ip',
      'paramValue': '@word',
      'operateUser': '@cname',
      'operateContent':'@word',
      'moduleName':'@word',
      'param':'@word',
    },
  ],
});

export function getSystemLogList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let dataSource = [...systemLogDataSource.result];
  // 搜索
  if (params.searchValue) {
    dataSource = dataSource.filter(data => data.happenDate.indexOf(params.searchValue) > -1);
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


