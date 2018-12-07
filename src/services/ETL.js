import { stringify } from 'qs';
import request from '../utils/request';

// 结构标准化
export async function structStandTable(params) {
  return request(`/api/ETL/structStand?${stringify(params)}`);
}
export async function deleteStructStandTable(params) {
  return request('/api/ETL/structStand', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
export async function addStructStandTable(params) {
  return request('/api/ETL/structStand', {
    method: 'POST',
    body: {
      formData: params,
      method: 'add',
    },
  });
}
export async function updateStructStandTable(params) {
  return request('/api/ETL/structStand', {
    method: 'POST',
    body: {
      formData: params,
      method: 'update',
    },
  });
}
// 数据标准化
export async function searchDataStandTable(params) {
  return request(`/api/ETL/dataStand?${stringify(params)}`);
}
export async function deleteDataStandTable(params) {
  return request('/api/ETL/dataStand', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
// export async function monitorTable() {
//   return request('/api/ETL/monitor');
// }
// 监控调度
export async function searchMonitorTable(params) {
  return request(`/api/ETL/monitor?${stringify(params)}`);
}
export async function searchMonitoModal(params) {
  return request(`/api/ETL/monitor/modalDetail?${stringify(params)}`);
}
export async function deleteMonitorTable(params) {
  return request('/api/ETL/monitor', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
export async function addMonitorAPI(params) {
  return request('/api/ETL/monitor', {
    method: 'POST',
    body: {
      formData: params,
      method: 'addOrUpdate',
    },
  });
}
// ETL日志
export async function searchEtlLogTable(params) {
  return request(`/api/ETL/etlLog?${stringify(params)}`);
}
// ETL配置
export async function searchEtlConfigTable(params) {
  return request(`/api/ETL/etlConfig?${stringify(params)}`);
}
export async function deleteEtlConfigTable(params) {
  return request('/api/ETL/etlConfig', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
export async function getEtlConfigInfo(params) {
  return request(`/api/ETL/etlConfig/modalDetail?${stringify(params)}`);
}
export async function addEtlConfig(params) {
  return request('/api/ETL/etlConfig', {
    method: 'POST',
    body: {
      formData: params,
      method: 'addOrUpdate',
    },
  });
}
