import { getEventManageListAPI, eventConfirmAPI } from '../../services/systemManage';

export default {
  namespace: 'eventManage',

  state: {
    data: { list: [], pagination: { total: 0, current: 1, pageSize: 10 } },
    params: {
      search: '',
      level: '',
      state: '',
      pageSize: 10,
      currentPage: 1,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getEventManageListAPI, payload);
      if (response) {
        yield put({
          type: 'queryEventManageList',
          payload: { data: response },
        });
      }
    },
    *eventConfirm({ payload }, { call, put }) {
      const response = yield call(eventConfirmAPI, payload);
      if (response) {
        yield put({
          type: 'queryEventManageList',
          payload: { data: response },
        });
      }
    },
  },

  reducers: {
    queryEventManageList(state, action) {
      // const {data,params:newParams=state.params}=action.payload
      return {
        ...state,
        data: action.payload.data,
      };
    },
  },
};
