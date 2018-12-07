import { getdataStandProcess } from '../../services/metadataMonitor';

export default {
  namespace: 'dataStandProcess',

  state: {},

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getdataStandProcess, payload);
      yield put({
        type: 'querydataStandProcess',
        payload: response,
      });
    },
  },

  reducers: {
    querydataStandProcess(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
