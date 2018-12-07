import { stringify } from 'qs';
import request from '../utils/request';

export async function searchAppSystemTable(params) {
  return request(`/api/configManagement/appSystem?${stringify(params)}`);
}
export async function deleteAppSystemTable(params) {
  return request('/api/configManagement/appSystem', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
export async function getAppSystemInfo(params) {
  return request(`/api/configManagement/appSystem/modalDetail?${stringify(params)}`);
}
export async function addAppSystem(params) {
  return request('/api/configManagement/appSystem', {
    method: 'POST',
    body: {
      formData: params,
      method: 'addOrUpdate',
    },
  });
}
export async function searchVersionManage(params) {
  return request(`/api/configManagement/metadataVersionManage?${stringify(params)}`);
}
export async function deleteVersionManage(params) {
  return request('/api/configManagement/metadataVersionManage', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
