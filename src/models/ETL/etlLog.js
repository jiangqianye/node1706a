import { searchEtlLogTable } from '../../services/ETL';

export default {
  namespace: 'etlLog',

  state: {
    dataSource: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(searchEtlLogTable, payload);
      if (response) {
        yield put({
          type: 'tableData',
          payload: response,
        });
      }
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
