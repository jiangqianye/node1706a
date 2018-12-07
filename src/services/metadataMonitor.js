import { stringify } from 'qs';
import request from '../utils/request';

// 数据运营状态
export async function queryFakeListByGet(params) {
  return request(`/api/metadataMonitor/dataOperationState?${stringify(params)}`);
}

export async function queryFakeListByGetByPost(params) {
  return request('/api/metadataMonitor/dataOperationState', {
    method: 'POST',
    body: params,
  });
}

// 数据存储状态
export async function queryDataStorageState(params) {
  return request(`/api/metadataMonitor/dataStorageState?${stringify(params)}`);
}

// 数据标准层
export async function queryTheme(params) {
  return request(`/api/metadataMonitor/standDataLayer/queryTheme?${stringify(params)}`);
}

export async function queryStandDataLayer(params) {
  return request(`/api/metadataMonitor/standDataLayer/tableData?${stringify(params)}`);
}

export async function getsdLayerDetail(params) {
  return request(`/api/metadataMonitor/standDataLayer/getsdLayerDetail?${stringify(params)}`);
}

export async function getAppDataMarket(params) {
  return request(`/api/metadataMonitor/standDataLayer/getAppDataMarket?${stringify(params)}`);
}

export async function getdataStandProcess(params) {
  return request(`/api/metadataMonitor/getdataStandProcess?${stringify(params)}`);
}
