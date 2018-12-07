import { stringify } from 'qs';
import request from '../utils/request';
// 用户管理
export async function getUserList(params) {
  return request(`/api/authorityManage/getUserList?${stringify(params)}`);
}
export async function getUserById(params) {
  return request(`/api/authorityManage/getUserById?${stringify(params)}`);
}

export async function addUser(params) {
  return request('/api/authorityManage/addUser', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteUsersAPI(params) {
  return request('/api/authorityManage/deleteUsers', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
// 角色管理
export async function getRoleList(params) {
  return request(`/api/authorityManage/getRoleList?${stringify(params)}`);
}
export async function getRoleById(params) {
  return request(`/api/authorityManage/getRoleById?${stringify(params)}`);
}

export async function addRole(params) {
  return request('/api/authorityManage/addRole', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteRoleAPI(params) {
  return request('/api/authorityManage/deleteRole', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

// 角色分配
export async function getroleAssignmentList(params) {
  return request(`/api/authorityManage/getroleAssignmentList?${stringify(params)}`);
}
export async function getroleAssignmentById(params) {
  return request(`/api/authorityManage/getroleAssignmentById?${stringify(params)}`);
}

export async function addroleAssignment(params) {
  return request('/api/authorityManage/addroleAssignment', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteroleAssignmentAPI(params) {
  return request('/api/authorityManage/deleteroleAssignment', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
