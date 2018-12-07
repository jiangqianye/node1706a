import { searchDataStandTable, deleteDataStandTable } from '../../services/ETL';

export default {
  namespace: 'dataStand',

  state: {
    dataSource: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(searchDataStandTable);
      if (response) {
        yield put({
          type: 'tableData',
          payload: response,
        });
      }
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteDataStandTable, payload);
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
