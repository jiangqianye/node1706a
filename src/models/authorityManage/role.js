import { getRoleList, getRoleById, addRole, deleteRoleAPI } from '../../services/authorityManage';

export default {
  namespace: 'authorityManageRole',

  state: {
    roleInfo: null, // 一个用户的信息
    data: { list: [], pagination: { total: 0, current: 1, pageSize: 10 } },
    params: {
      currentPage: 1,
      pageSize: 10,
      searchValue: '',
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getRoleList, payload);
      if (response) {
        yield put({
          type: 'queryRoleList',
          payload: { data: response },
        });
      }
    },
    *fetchbyId({ payload, callback }, { call, put }) {
      const response = yield call(getRoleById, payload);
      if (response) {
        yield put({
          type: 'getRoleById',
          payload: response,
        });
      }
      if (callback) callback();
    },
    *addOrUpdate({ payload, callback }, { call, put }) {
      const response = yield call(addRole, payload);
      if (response) {
        yield put({
          type: 'queryRoleList',
          payload: { data: response },
        });
        if (callback) callback();
      }
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(deleteRolesAPI, payload);
      if (response) {
        yield put({
          type: 'queryRoleList',
          payload: { data: response },
        });
      }
      if (callback) callback();
    },

    *clearRoleInfo(_, { call, put }) {
      yield put({
        type: 'clearModal',
        payload: null,
      });
    },
  },

  reducers: {
    queryRoleList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    getRoleById(state, action) {
      return {
        ...state,
        roleInfo: action.payload,
      };
    },
    clearModal(state, action) {
      return {
        ...state,
        roleInfo: action.payload,
      };
    },
  },
};
