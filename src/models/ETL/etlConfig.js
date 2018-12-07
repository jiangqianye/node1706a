import {
  searchEtlConfigTable,
  getEtlConfigInfo,
  addEtlConfig,
  deleteEtlConfigTable,
} from '../../services/ETL';

export default {
  namespace: 'etlConfig',
  state: {
    etlConfigInfo: null,
    dataSource: [],
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(searchEtlConfigTable, payload);
      if (response) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
      if (callback) callback();
    },
    *fetchBykey({ payload }, { call, put }) {
      const response = yield call(getEtlConfigInfo, payload);
      if (response) {
        yield put({
          type: 'EtlConfigInfo',
          payload: response,
        });
      }
    },
    *addOrUpdate({ payload }, { call, put }) {
      const response = yield call(addEtlConfig, payload);
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
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteEtlConfigTable, payload);
      if (response) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
      if (callback) callback();
    },
  },

  reducers: {
    queryList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    EtlConfigInfo(state, { payload }) {
      return {
        ...state,
        etlConfigInfo: payload,
      };
    },
    clearModal(state, { payload }) {
      return {
        ...state,
        etlConfigInfo: payload,
      };
    },
  },
  subscriptions: {},
};
