import { getAppDataMarket } from '../../services/metadataMonitor';

export default {
  namespace: 'appDataMarket',

  state: {
    data: [],
    type: '1',
    subType: '1.1',
    searchValue: '',
    params: {
      currentPage: 1,
      pageSize: 10,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { type, subType } = payload;
      if (type && subType) {
        const response = yield call(getAppDataMarket, payload);
        yield put({
          type: 'queryappDataMarket',
          payload: { data: response, type, subType },
        });
      }
    },
  },

  reducers: {
    queryappDataMarket(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
