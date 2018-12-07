import mockjs from 'mockjs';
import { parse } from 'url';

const tableListDataSource = mockjs.mock({
  'list|200': [
    {
      'key|+1': 1,
      'missionName|+1': '@ctitle()',
      'start|+1': '@ctitle()',
      'gap|+1': '@ctitle()',
      'amount|+1': '@ctitle()',
      'wasteTime|+1': '@ctitle()',
      'speed|+1': '@ctitle()',
      'result|+1': '@ctitle()',
      'description|+1': '@ctitle()',
      'type|+1': ['auto', 'manual', 'manual', 'auto', 'auto', 'auto', 'manual'],
    },
  ],
});
// 获取列表数据
export function getEtlLogList(req, res, u) {
  let dataList = [...tableListDataSource.list];

  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;
  if (params.type === 'auto' || params.type === 'manual') {
    dataList = dataList.filter(item => item.type === params.type);
  }
  if (params.searchValue) {
    dataList = dataList.filter(item => item.missionName === params.searchValue);
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
