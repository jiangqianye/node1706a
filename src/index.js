import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import './rollbar';

import './index.less';
import { add } from 'gl-matrix/src/gl-matrix/mat2';

// 1. Initialize
const app = dva({
  history: createHistory(),
  onAction: createLogger(),
});

// 2. Plugins
// 自动处理加载状态
app.use(createLoading());

// 3. Register global model
app.model(require('./models/global').default);
app.model(require('./models/homePage').default);
app.model(require('./models/metadataMonitor/dataOperationState').default);
app.model(require('./models/ETL/structStand').default);
app.model(require('./models/ETL/dataStand').default);
app.model(require('./models/ETL/monitor').default);
app.model(require('./models/ETL/etlLog').default);
app.model(require('./models/ETL/etlConfig').default);
app.model(require('./models/configManagement/appSystem').default);
app.model(require('./models/configManagement/metadataVersionManage').default);
app.model(require('./models/metadataMonitor/dataStorageState').default);
app.model(require('./models/metadataMonitor/standDataLayer').default);
app.model(require('./models/metadataMonitor/appDataMarket').default);
app.model(require('./models/metadataMonitor/dataStandProcess').default);

// 权限管理
app.model(require('./models/authorityManage/user').default);
app.model(require('./models/authorityManage/role').default);
app.model(require('./models/authorityManage/roleAssignment').default);
// 系统管理
app.model(require('./models/systemManage/systemParam').default);
app.model(require('./models/systemManage/systemLog').default);
app.model(require('./models/systemManage/eventManage').default);

// 元数据解析
app.model(require('./models/metadataResolve/datalinkManage').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line
