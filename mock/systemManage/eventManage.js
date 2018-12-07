import mockjs from 'mockjs';
import { parse } from 'url';

const levels = [
  { value: 'fault', label: '故障' },
  { value: 'warning', label: '警告' },
  { value: 'event', label: '事件' },
];
const dealState = [
  { value: 'ok', label: '未处理' },
  { value: 'no', label: '已处理' },
];

const eventManageDataSource = mockjs.mock({
  'result|20': [
    {
      'key|+1': 1,
      'level|+1': levels,
      'moduleName': '@word',
      'eventName': '@word',
      'eventdescribe': '@word',
      'happenTime': '@datetime',
      'dealTime': '@datetime',
      'dealUser': '@cname',
      'repairSuggest': '@word',
      'state|+1': dealState,
    },
  ],
});

export function getEventManageList(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  const bodyParams = (b && b.body) || req.body;
  const dataSource = [...eventManageDataSource.result];
  const { search, level, state } = params;

  // ---- 事件确认
  if (Array.isArray(bodyParams.keys) && bodyParams.keys.length > 0) {

  }

  // -----------搜索
  // -----关键字
  const dataSourceBySearch = search ? dataSource.filter(data => data.moduleName.indexOf(search) > -1)
    : dataSource;
  // -----等级
  const dataSourceByLevel = level ? dataSourceBySearch.filter(data => data.level.value.indexOf(level) > -1)
    : dataSourceBySearch;
  // -----状态
  const dataSourceByState = state ? dataSourceByLevel.filter(data => data.state.value.indexOf(state) > -1)
    : dataSourceByLevel;


  const result = {
    list: dataSourceByState,
    pagination: {
      total: dataSourceByState.length,
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
export function postEventConfirm(req, res, u, b) {
  return null;
}


