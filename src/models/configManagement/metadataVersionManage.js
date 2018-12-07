import { searchVersionManage, deleteVersionManage } from '../../services/configManagement';

export default {
  namespace: 'metadataVersionManage',

  state: {
    dataSource: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(searchVersionManage, payload);
      if (response) {
        yield put({
          type: 'tableData',
          payload: response,
        });
      }
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteVersionManage, payload);
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
