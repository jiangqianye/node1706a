import { getUserList, getUserById, addUser, deleteUsersAPI } from '../../services/authorityManage';

export default {
  namespace: 'authorityManageUser',

  state: {
    userInfo: null, // 一个用户的信息
    data: { list: [], pagination: { total: 0, current: 1, pageSize: 10 } },
    params: {
      currentPage: 1,
      pageSize: 10,
      searchValue: '',
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getUserList, payload);
      if (response) {
        yield put({
          type: 'queryUserList',
          payload: { data: response },
        });
      }
    },
    *fetchbyId({ payload, callback }, { call, put }) {
      const response = yield call(getUserById, payload);
      if (response) {
        yield put({
          type: 'getUserById',
          payload: response,
        });
      }
      if (callback) callback();
    },
    *addOrUpdate({ payload, callback }, { call, put }) {
      const response = yield call(addUser, payload);
      if (response) {
        yield put({
          type: 'queryUserList',
          payload: { data: response },
        });
        if (callback) callback();
      }
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(deleteUsersAPI, payload);
      if (response) {
        yield put({
          type: 'queryUserList',
          payload: { data: response },
        });
      }
      if (callback) callback();
    },

    *clearUserInfo(_, { call, put }) {
      yield put({
        type: 'clearModal',
        payload: null,
      });
    },
  },

  reducers: {
    queryUserList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    getUserById(state, action) {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
    clearModal(state, action) {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
  },
};
