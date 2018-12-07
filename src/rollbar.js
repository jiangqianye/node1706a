import Rollbar from 'rollbar';
// Rollbar为开发人员提供实时异常报告和持续部署监控
// Track error by rollbar.com
if (location.host === 'preview.pro.ant.design') {
  Rollbar.init({
    accessToken: '033ca6d7c0eb4cc1831cf470c2649971',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });
}
