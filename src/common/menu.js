import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '首页',
    icon: 'home',
    path: 'homePage',
    children: [],
  },
  {
    name: '元数据解析',
    icon: 'dashboard',
    path: 'metadataResolve',
    children: [
      { name: '数据链管理', path: 'datalinkManage' },
      { name: '元数据导入', path: 'metadataImport' },
      { name: '定义数据源', path: 'defineDataSources' },
      { name: '元数据采集', path: 'metadataCollect' },
      { name: '元数据识别', path: 'metadataRecognize' },
      { name: '非结构化解析', path: 'unstructResolve' },
    ],
  },
  {
    name: 'ETL数据调度',
    icon: 'fork',
    path: 'etl',
    children: [
      { name: '结构标准化', path: 'structStand' },
      { name: '数据标准化', path: 'dataStand' },
      { name: '监控调度', path: 'monitor' },
      { name: 'ETL日志', path: 'etlLog' },
      { name: 'ETL配置', path: 'etlConfig' },
    ],
  },
  {
    name: '配置管理',
    icon: 'profile',
    path: 'configManage',
    children: [
      { name: '应用系统配置', path: 'appSystem' },
      { name: '元数据版本管理', path: 'metadataVersion' },
    ],
  },
  {
    name: '元数据监控',
    icon: 'pie-chart',
    path: 'metadataMonitor',
    // hideInMenu: true,  // 隐藏该条
    children: [
      { name: '数据运营状态', path: 'dataOperationState' },
      { name: '数据存储状态', path: 'dataStorageState' },
      { name: '数据标准化流程', path: 'standDataProcess' },
      { name: '应用数据集市', path: 'appDataMarket' },
      { name: '标准数据层', path: 'standDataLayer' },
    ],
  },
  {
    name: '元数据分析',
    icon: 'bar-chart',
    path: 'metadataAnalysis',
    children: [
      { name: '血缘分析', path: 'blood' },
      { name: '影响分析', path: 'effect' },
      { name: '全链分析', path: 'wholeChain' },
      { name: '元数据检索', path: 'metadataRetrieval' },
    ],
  },
  {
    name: '权限管理',
    icon: 'user',
    path: 'authorityManage',
    children: [
      { name: '用户管理', path: 'user' },
      { name: '角色管理', path: 'role' },
      { name: '角色分配', path: 'roleAssignment' },
    ],
  },
  {
    name: '系统管理',
    icon: 'setting',
    path: 'systemManage',
    children: [
      { name: '系统参数设置', path: 'systemParam' },
      { name: '数据备份管理', path: 'dataBackup' },
      { name: '事件管理', path: 'eventManage' },
      { name: '系统日志', path: 'systemLog' },
    ],
  },

  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
