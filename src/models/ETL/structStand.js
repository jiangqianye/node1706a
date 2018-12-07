import {
  structStandTable,
  deleteStructStandTable,
  addStructStandTable,
  updateStructStandTable,
} from '../../services/ETL';

export default {
  namespace: 'structStand',

  state: {
    dataSource: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(structStandTable, payload);
      if (response) {
        yield put({
          type: 'tableData',
          payload: response,
        });
      }
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteStructStandTable, payload);
      if (response) {
        yield put({
          type: 'tableData',
          payload: response,
        });
      }
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addStructStandTable, payload);
      if (response) {
        yield put({
          type: 'tableData',
          payload: response,
        });
      }
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateStructStandTable, payload);
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
