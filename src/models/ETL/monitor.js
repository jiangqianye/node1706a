import {
  searchMonitorTable,
  searchMonitoModal,
  deleteMonitorTable,
  addMonitorAPI,
} from '../../services/ETL';

export default {
  namespace: 'monitor',

  state: {
    dataSource: [],
    monitorInfo: null,
    modalData: {
      initial: {
        sourcePath: '',
        mode: '',
        mapName: '',
        remark: '',
      },
      option: {
        sourcePathOptions: [],
        modeOptions: [],
      },
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(searchMonitorTable, payload);
      if (response) {
        yield put({
          type: 'queryMonitorList',
          payload: response,
        });
      }
    },
    *fetchBykey({ payload }, { call, put }) {
      const response = yield call(searchMonitoModal, payload);
      if (response) {
        yield put({
          type: 'modalData',
          payload: response,
        });
      }
    },
    *clearModal(_, { put }) {
      yield put({
        type: 'clearInitial',
        payload: {},
      });
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteMonitorTable, payload);
      if (response) {
        yield put({
          type: 'queryMonitorList',
          payload: response,
        });
      }
      if (callback) callback();
    },
    *addOrUpdate({ payload, callback }, { call, put }) {
      const response = yield call(addMonitorAPI, payload);
      if (response) {
        yield put({
          type: 'queryMonitorList',
          payload: response,
        });
      }
      if (callback) callback();
    },
  },

  reducers: {
    queryMonitorList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    modalData(state, { payload }) {
      return {
        ...state,
        monitorInfo: payload,
      };
    },
    clearInitial(state, { payload }) {
      return {
        ...state,
        // modalData: payload,
        monitorInfo: payload,
      };
    },
  },

  subscriptions: {},
};
