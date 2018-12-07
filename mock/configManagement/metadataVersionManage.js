import mockjs from 'mockjs';
import { parse } from 'url';

const tableListDataSource = mockjs.mock({
  'list|200': [
    {
      'key|+1': 1,
      'company|+1': [
        { key: '1', value: '全部' },
        { key: '2', value: '杭创' },
        { key: '3', value: '天键' },
        { key: '4', value: '东华' },
        { key: '5', value: '中联' },
        { key: '6', value: '东软' },
        { key: '7', value: '九阵' },
        { key: '8', value: '惠宜康' },
        { key: '9', value: '厦门智业' },
        { key: '10', value: '北大医信' },
        { key: '11', value: '成电医星' },
        { key: '12', value: '金仕达卫宁' },
        { key: '13', value: '诚邦' },
        { key: '14', value: '其他' },
      ],
      'tableNum|+1': '@ctitle(5)',
      'mark|+1': '@ctitle(2)',
      'time|+1': '@date',
    },
  ],
});
// 获取列表数据
export function getMetadataVersionManageList(req, res, u) {
  let dataList = [...tableListDataSource.list];
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;
  if (params.operate && params.operate !== '1') {
    dataList = dataList.filter(item => item.company.key === params.operate);
  }
  // console.log(dataList)
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
export function postMetadataVersionManageList(req, res, u, b) {
  let dataList = [...tableListDataSource.list];

  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, selectedRows, pageSize, currentPage } = body;
  switch (method) {
    case 'delete':
      if (Array.isArray(selectedRows) && selectedRows.length > 0) {
        selectedRows.forEach(key => {
          dataList = dataList.filter(item => item.key !== key);
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
