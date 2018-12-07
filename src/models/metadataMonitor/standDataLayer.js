import { queryTheme, queryStandDataLayer, getsdLayerDetail } from '../../services/metadataMonitor';

export default {
  namespace: 'standDataLayer',

  state: {
    tabpanes: [],
    dataSource: { list: [], pagination: { total: 0, current: 1, pageSize: 10 } },
    activeTab: '',
    detailData: [],
  },

  effects: {
    // 获取主题域 值域列表的tabpanes数据
    *fetch({ payload }, { call, put }) {
      const tabpanes = yield call(queryTheme, payload);
      const bool = payload && typeof payload.activeTab && payload.activeTab.length > 0;
      const activeTab = bool ? payload.activeTab : tabpanes[0].key;
      const dataSourceParam = bool ? payload : { activeTab };
      const dataSource = yield call(queryStandDataLayer, dataSourceParam);

      yield put({
        type: 'queryStandDataLayer',
        payload: { tabpanes, dataSource, activeTab },
      });
    },

    *fetchDetail({ payload }, { call, put }) {
      const detailData = yield call(getsdLayerDetail, payload);
      yield put({
        type: 'queryStandDataLayerDetail',
        payload: detailData,
      });
    },
  },

  reducers: {
    queryStandDataLayer(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    queryStandDataLayerDetail(state, action) {
      return {
        ...state,
        detailData: action.payload,
      };
    },
  },
};
