import { queryDataStorageState } from '../../services/metadataMonitor';

export default {
  namespace: 'dataStorageState',

  state: {
    data: { list: [], pagination: { total: 0, current: 1, pageSize: 10 } },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDataStorageState, payload);
      yield put({
        type: 'queryDataStorageState',
        payload: response,
      });
    },
  },

  reducers: {
    queryDataStorageState(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
