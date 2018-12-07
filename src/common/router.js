import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;
// 模块是否存在(返回true--不存在，返回false---存在)
const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/homePage': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/HomePage')),
    },
    '/metadataMonitor/dataOperationState': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/MetadataMonitor/dataOperationState')
      ),
    },
    '/metadataMonitor/dataStorageState': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/MetadataMonitor/dataStorageState')
      ),
    },
    '/metadataMonitor/standDataProcess': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/MetadataMonitor/dataStandProcess')
      ),
    },
    '/metadataMonitor/appDataMarket': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/MetadataMonitor/appDataMarket')
      ),
    },
    '/metadataMonitor/standDataLayer': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/MetadataMonitor/standDataLayer/index')
      ),
    },

    '/metadataResolve/datalinkManage': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/MetadataResolve/datalinkManage')
      ),
    },
    '/metadataResolve/metadataImport': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/MetadataResolve/metadataImport')
      ),
    },
    '/metadataResolve/defineDataSources': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/MetadataResolve/defineDataSources')
      ),
    },
    '/metadataResolve/metadataCollect': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/MetadataResolve/metadataCollect')
      ),
    },
    '/metadataResolve/metadataRecognize': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/MetadataResolve/metadataRecognize')
      ),
    },
    '/metadataResolve/unstructResolve': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/MetadataResolve/unstructResolve')
      ),
    },

    '/configManage/appSystem': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/ConfigManage/appSystem')),
    },
    '/configManage/metadataVersion': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/ConfigManage/metadataVersion')
      ),
    },

    '/metadataAnalysis/blood': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/MetadataAnalysis/blood')),
    },
    '/metadataAnalysis/effect': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/MetadataAnalysis/effect')
      ),
    },
    '/metadataAnalysis/wholeChain': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/MetadataAnalysis/wholeChain')
      ),
    },
    '/metadataAnalysis/metadataRetrieval': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/MetadataAnalysis/metadataRetrieval')
      ),
    },

    '/authorityManage/user': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/AuthorityManage/user')),
    },
    '/authorityManage/role': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/AuthorityManage/role')),
    },
    '/authorityManage/roleAssignment': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/AuthorityManage/roleAssignment')
      ),
    },

    '/systemManage/systemParam': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/SystemManage/systemParam')
      ),
    },
    '/systemManage/dataBackup': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/SystemManage/dataBackup')
      ),
    },
    '/systemManage/eventManage': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/SystemManage/eventManage')
      ),
    },
    '/systemManage/systemLog': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/SystemManage/systemLog')),
    },

    '/etl/structStand': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/ETL/structStand')),
    },
    '/etl/dataStand': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/ETL/dataStand')),
    },
    '/etl/monitor': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/ETL/monitor')),
    },
    '/etl/etlLog': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/ETL/etlLog')),
    },
    '/etl/etlConfig': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/ETL/etlConfig')),
    },

    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
