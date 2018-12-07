import {
  getMetadataResolveList,
  addMetadataResolve,
  deleteMetadataResolve,
} from '../../services/metadataResolve';
// import {}

export default {
  namespace: 'datalinkManage',

  state: {
    dataSource: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getMetadataResolveList);
      if (response) {
        yield put({
          type: 'tableData',
          payload: response,
        });
      }
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addMetadataResolve, payload);
      if (response) {
        yield put({
          type: 'tableData',
          payload: response,
        });
      }
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteMetadataResolve, payload);
      if (response) {
        yield put({
          type: 'tableData',
          payload: response,
        });
      }
      if (callback) callback();
    },
  },

  reducers: {
    tableData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  subscriptions: {},
};
