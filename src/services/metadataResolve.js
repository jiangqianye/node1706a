import { stringify } from 'qs';
import request from '../utils/request';

export async function getMetadataResolveList(params) {
  return request(`/api/metadataResolve/datalinkManage?${stringify(params)}`);
}

export async function addMetadataResolve(params) {
  return request('/api/metadataResolve/datalinkManage', {
    method: 'POST',
    body: {
      formData: params,
      method: 'addOrUpdate',
    },
  });
}
export async function deleteMetadataResolve(params) {
  return request('/api/metadataResolve/datalinkManage', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
