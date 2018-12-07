import { fakeHomePage } from '../services/api';

export default {
  namespace: 'homePage',

  state: {
    dataOperatedState: { columns: [], dataSource: [] },
    dataStorageState: { columns: [], dataSource: [] },
    logicRelative: { nodes: [], edges: [] },
    etlMonitor: {
      success: 0,
      successPercent: 0,
      fail: 0,
      failPercent: 0,
      running: 0,
      runningPercent: 0,
      notRun: 0,
      notRunPercent: 0,
      taskTotal: 0,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fakeHomePage, payload);

      if (response && response.status === 'ok') {
        yield put({
          type: 'getHomePageData',
          payload: response.result,
        });
      }
    },
  },

  reducers: {
    getHomePageData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
