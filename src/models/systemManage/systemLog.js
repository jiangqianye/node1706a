import { getSystemLogListAPI } from '../../services/systemManage';

export default {
  namespace: 'systemLog',

  state: {
    data: { list: [], pagination: { total: 0, current: 1, pageSize: 10 } },
    params: {
      currentPage: 1,
      pageSize: 10,
      searchValue: '',
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getSystemLogListAPI, payload);
      if (response) {
        yield put({
          type: 'querySytemLogList',
          payload: response,
        });
      }
    },
  },

  reducers: {
    querySytemLogList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
