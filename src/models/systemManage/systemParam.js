import {
  getParamListAPI,
  getParamInfoAPI,
  addParamAPI,
  deleteParamAPI,
} from '../../services/systemManage';

export default {
  namespace: 'systemParam',

  state: {
    paramInfo: null, // 一个参数的信息
    data: { list: [], pagination: { total: 0, current: 1, pageSize: 10 } },
    params: {
      currentPage: 1,
      pageSize: 10,
      searchValue: '',
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getParamListAPI, payload);
      if (response) {
        yield put({
          type: 'queryParamList',
          payload: { data: response },
        });
      }
    },
    *fetchbyId({ payload, callback }, { call, put }) {
      const response = yield call(getParamInfoAPI, payload);
      if (response) {
        yield put({
          type: 'queryParamInfo',
          payload: response,
        });
      }
      if (callback) callback();
    },
    *addOrUpdate({ payload, callback }, { call, put }) {
      const response = yield call(addParamAPI, payload);
      if (response) {
        yield put({
          type: 'queryParamList',
          payload: { data: response },
        });
        if (callback) callback();
      }
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(deleteParamAPI, payload);
      if (response) {
        yield put({
          type: 'queryParamList',
          payload: { data: response },
        });
      }
      if (callback) callback();
    },

    *clearParamInfo(_, { call, put }) {
      yield put({
        type: 'clearModal',
        payload: null,
      });
    },
  },

  reducers: {
    queryParamList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    queryParamInfo(state, action) {
      return {
        ...state,
        paramInfo: action.payload,
      };
    },
    clearModal(state, action) {
      return {
        ...state,
        paramInfo: action.payload,
      };
    },
  },
};
