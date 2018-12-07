import { queryFakeListByGet } from '../../services/metadataMonitor';

export default {
  namespace: 'dataOperationState',

  state: {
    data: { list: [], pagination: { total: 0, current: 1, pageSize: 10 } },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeListByGet, payload);
      console.log(response);
      yield put({
        type: 'queryDataOperationState',
        payload: response,
      });
    },
  },

  reducers: {
    queryDataOperationState(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
