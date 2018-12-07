import {
  getroleAssignmentList,
  getroleAssignmentById,
  addroleAssignment,
  deleteroleAssignmentAPI,
} from '../../services/authorityManage';

export default {
  namespace: 'authorityManageroleAssignment',

  state: {
    roleAssignmentInfo: null, // 一个用户的信息
    data: { list: [], pagination: { total: 0, current: 1, pageSize: 10 } },
    params: {
      currentPage: 1,
      pageSize: 10,
      searchValue: '',
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getroleAssignmentList, payload);
      if (response) {
        yield put({
          type: 'queryroleAssignmentList',
          payload: { data: response },
        });
      }
    },
    *fetchbyId({ payload, callback }, { call, put }) {
      const response = yield call(getroleAssignmentById, payload);
      if (response) {
        yield put({
          type: 'getroleAssignmentById',
          payload: response,
        });
      }
      if (callback) callback();
    },
    *addOrUpdate({ payload, callback }, { call, put }) {
      const response = yield call(addroleAssignment, payload);
      if (response) {
        yield put({
          type: 'queryroleAssignmentList',
          payload: { data: response },
        });
        if (callback) callback();
      }
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(deleteroleAssignmentAPI, payload);
      if (response) {
        yield put({
          type: 'queryroleAssignmentList',
          payload: { data: response },
        });
      }
      if (callback) callback();
    },

  *clearroleAssignmentInfo(_, { call, put }) {
    yield put({
      type: 'clearModal',
      payload: null,
    });
  },
},

reducers: {
  queryroleAssignmentList(state, action) {
    return {
      ...state,
      ...action.payload,
    };
  },
  getroleAssignmentById(state, action) {
    return {
      ...state,
      roleAssignmentInfo: action.payload,
    };
  },
  clearModal(state, action) {
    return {
      ...state,
      roleAssignmentInfo: action.payload,
    };
  },
},
};
