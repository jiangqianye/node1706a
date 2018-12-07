import { stringify } from 'qs';
import request from '../utils/request';
// 系统参数管理
export async function getParamListAPI(params) {
  return request(`/api/systemManage/getParamListAPI?${stringify(params)}`);
}
export async function getParamInfoAPI(params) {
  return request(`/api/systemManage/getParamInfoAPI?${stringify(params)}`);
}

export async function addParamAPI(params) {
  return request('/api/systemManage/addParamAPI', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteParamAPI(params) {
  return request('/api/systemManage/deleteParamAPI', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

// -------系统日志---------------------------
export async function getSystemLogListAPI(params) {
  return request(`/api/systemManage/getSystemLogListAPI?${stringify(params)}`);
}

// --------事件管理
export async function getEventManageListAPI(params) {
  return request(`/api/systemManage/getEventManageListAPI?${stringify(params)}`);
}
export async function eventConfirmAPI(params) {
  return request('/api/systemManage/eventConfirmAPI', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
