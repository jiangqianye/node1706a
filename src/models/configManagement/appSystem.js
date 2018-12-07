import {
  searchAppSystemTable,
  getAppSystemInfo,
  addAppSystem,
  deleteAppSystemTable,
} from '../../services/configManagement';

export default {
  namespace: 'appSystem',

  state: {
    appSystemInfo: null,
    dataSource: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(searchAppSystemTable, payload);
      if (response) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteAppSystemTable, payload);
      if (response) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
      if (callback) callback();
    },
    *fetchBykey({ payload }, { call, put }) {
      const response = yield call(getAppSystemInfo, payload);
      if (response) {
        yield put({
          type: 'AppSystemInfo',
          payload: response,
        });
      }
    },
    *addOrUpdate({ payload }, { call, put }) {
      const response = yield call(addAppSystem, payload);
      if (response) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
    },
    *clearInfo(_, { put }) {
      yield put({
        type: 'clearModal',
        payload: null,
      });
    },
  },

  reducers: {
    queryList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    AppSystemInfo(state, { payload }) {
      return {
        ...state,
        appSystemInfo: payload,
      };
    },
    clearModal(state, { payload }) {
      return {
        ...state,
        appSystemInfo: payload,
      };
    },
  },

  subscriptions: {},
};
