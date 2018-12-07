const data = {
  beta1Menu: [
    { name: '首页', icon: 'user', path: '/', children: [] },
    {
      name: '元数据解析',
      icon: 'dashboard',
      path: '/',
      children: [
        { name: '数据逻辑关系', path: '/metadataLogic' },
        {
          name: '元数据导入',
          path: '/metadataImport',
          children: [{ name: '查看目标文件', path: '/metadataImport/metadataImportTable' }],
        },
        { name: '定义数据源', path: '/metadataSource' },
        {
          name: '元数据采集',
          path: '/metadataCollect',
          children: [{ name: '查看目标表', path: 'metadataCollect/checkTargetTable' }],
        },
        {
          name: '元数据识别',
          path: '/metadataRecognition',
          children: [
            { name: '查看目标表', path: '/metadataRecognition/checkTargetTable' },
            { name: '目标表详情', path: '/metadataRecognition/checkTargetTable/detail' },
          ],
        },
        {
          name: '非结构化解析',
          path: '/unstructStand',
          children: [{ name: '目标表详情', path: '/unstructStand/tableDetail' }],
        },
      ],
    },
    {
      name: 'ETL',
      icon: 'fork',
      path: '/',
      children: [
        {
          name: '结构标准化',
          path: '/structStand',
          children: [
            { name: '查看目标表', path: '/structStand/checkTargetTable' },
            { name: '目标表详情', path: '/structStand/checkTargetTable/detail' },
          ],
        },
        { name: '数据标准化', path: '/dataStand' },
        { name: '监控调度', path: '/control' },
        { name: 'ETL日志', path: '/etlLog' },
      ],
    },
    {
      name: '配置管理',
      icon: 'profile',
      path: '/',
      children: [
        { name: '应用系统配置', path: '/appSystem' },
        {
          name: '元数据版本管理',
          path: '/metadataVersionManage',
          children: [
            { name: '版本比较详情', path: '/metadataVersionManage/metaDataVersionManageDetail' },
          ],
        },
      ],
    },
    {
      name: '元数据监控',
      icon: 'pie-chart',
      path: '/',
      children: [
        { name: '数据运营状态', path: '/dataOperation' },
        { name: '数据存储状态', path: '/dataSave' },
        { name: '数据标准化流程', path: '/dataStandProcess' },
        { name: '标准数据层', path: '/standDataLayer' },
        { name: '应用数据集市', path: '/appDataMarket' },
      ],
    },
    {
      name: '系统管理',
      icon: 'setting',
      path: '/',
      children: [
        { name: '系统参数设置', path: '/systemSet' },
        { name: '数据备份管理', path: '/dataBackupManage' },
        { name: '事件管理', path: '/eventManage' },
        { name: '系统日志', path: '/systemLog' },
      ],
    },
  ],
  slideData: {
    //基础平台
    basic_platform: [
      { code: '0', cName: '首页', eName: 'IndexPage', link: '/', icon: '' },
      { code: '1', cName: '用户管理', eName: 'userManagement', link: '/userManagement', icon: '' },
      { code: '2', cName: '角色管理', eName: 'roleManagement', link: '/roleManagement', icon: '' },
      {
        code: '3',
        cName: '权限管理',
        eName: 'powerManagement',
        link: '/powerManagement',
        icon: '',
      },
      { code: '4', cName: '系统安全', eName: 'systemSafe', link: '/systemSafe', icon: '' },
      { code: '5', cName: '日志管理', eName: 'logManagement', link: '/logManagement', icon: '' },
      {
        code: '6',
        cName: '组件管理',
        eName: 'componentManagement',
        link: '/componentManagement',
        icon: '',
      },
      { code: '7', cName: '事件消息', eName: 'eventMessage', link: '/eventMessage', icon: '' },
      {
        code: '8',
        cName: '版本授权',
        eName: 'versionAuthorization',
        link: '/versionAuthorization',
        icon: '',
      },
      { code: '9', cName: '系统设置', eName: 'systemSetting', link: '/systemSetting', icon: '' },
    ],
    //元数据管理
    metadata_management: [
      { code: '0', cName: '首页', eName: 'IndexPage', link: '/', icon: '' },
      {
        code: '18380108721',
        cName: 'twaverDemo',
        eName: 'twaverDemo',
        link: '/twaverDemo',
        icon: '',
      },
      {
        code: '10',
        cName: '元数据检索',
        eName: 'metadataRetrieval',
        link: '/metadataRetrieval',
        icon: '',
      },
      {
        code: '11',
        cName: '元数据统计',
        eName: 'metadataStatistics',
        link: '/metadataStatistics',
        icon: '',
      },
      {
        code: '12',
        cName: '元数据识别',
        eName: 'metadataRecognition',
        link: '/metadataRecognition',
        icon: '',
      },
      { code: '13', cName: '结构标准化', eName: 'structStand', link: '/structStand', icon: '' },
      { code: '14', cName: '值域标准化', eName: 'filedStand', link: '/filedStand', icon: '' },
      {
        code: '15',
        cName: '非结构化解析',
        eName: 'unstructStand',
        link: '/unstructStand',
        icon: '',
      },
      { code: '16', cName: '数据标准化', eName: 'dataStand', link: '/dataStand', icon: '' },
      { code: '17', cName: '生命周期管理', eName: 'lifecircle', link: '/lifecircle', icon: '' },
      { code: '18', cName: '血缘分析', eName: 'bloodAnalysis', link: '/bloodAnalysis', icon: '' },
      { code: '19', cName: '影响分析', eName: 'impactAnalysis', link: '/impactAnalysis', icon: '' },
      {
        code: '20',
        cName: '版本对比',
        eName: 'versionComparison',
        link: '/versionComparison',
        icon: '',
      },
      {
        code: '21',
        cName: '元数据导入导出',
        eName: 'metadataImport',
        link: '/metadataImport',
        icon: '',
      },
    ],
    //运营监控管理
    operation_control: [
      {
        code: '22',
        cName: '运行环境监控',
        eName: 'environmentControl',
        link: '/environmentControl',
        icon: '',
      },
      { code: '23', cName: '在线用户监控', eName: 'userControl', link: '/userControl', icon: '' },
      { code: '24', cName: '存储监控', eName: 'savaControl', link: '/savaControl', icon: '' },
      {
        code: '25',
        cName: '数据质量监控',
        eName: 'qualityControl',
        link: '/qualityControl',
        icon: '',
      },
      {
        code: '26',
        cName: '数据使用频率监控',
        eName: 'rateControl',
        link: '/rateControl',
        icon: '',
      },
      { code: '27', cName: '数据融合监控', eName: 'mixedControl', link: '/mixedControl', icon: '' },
      {
        code: '28',
        cName: '指标异常监控',
        eName: 'abnormalControl',
        link: '/abnormalControl',
        icon: '',
      },
      {
        code: '29',
        cName: '版本监控',
        eName: 'comparisonControl',
        link: '/comparisonControl',
        icon: '',
      },
    ],
    //数据融合交换
    data_control_exchange: [
      { code: '30', cName: 'ETL规则管理', eName: 'etlRule', link: '/etlRule', icon: '' },
      { code: '31', cName: 'ETL调度', eName: 'etlControl', link: '/etlControl', icon: '' },
      { code: '32', cName: 'ETL运行日志', eName: 'etlLogs', link: '/etlLogs', icon: '' },
      { code: '33', cName: 'ETL分区集群', eName: 'etlGather', link: '/etlGather', icon: '' },
      { code: '34', cName: '数据交换接口', eName: 'etlExchange', link: '/etlExchange', icon: '' },
    ],
    //数据文件管理
    data_file_management: [
      { code: '35', cName: '定义数据源', eName: 'dataSource', link: '/dataSource', icon: '' },
      {
        code: '36',
        cName: '元数据采集',
        eName: 'metadataCollect',
        link: '/metadataCollect',
        icon: '',
      },
      {
        code: '37',
        cName: '备份库管理',
        eName: 'backupManagement',
        link: '/backupManagement',
        icon: '',
      },
      {
        code: '38',
        cName: '平台库管理',
        eName: 'platManagement',
        link: '/platManagement',
        icon: '',
      },
      {
        code: '39',
        cName: '数据集市管理',
        eName: 'marketManagement',
        link: '/marketManagement',
        icon: '',
      },
      {
        code: '40',
        cName: '知识图谱管理',
        eName: 'knowledgeManagement',
        link: '/knowledgeManagement',
        icon: '',
      },
      { code: '41', cName: '文件管理', eName: 'fileManagement', link: '/fileManagement', icon: '' },
      { code: '42', cName: '数据搜索引擎', eName: 'dataSearch', link: '/dataSearch', icon: '' },
      { code: '43', cName: '数据安全', eName: 'dataSafe', link: '/dataSafe', icon: '' },
    ],
    //报表和商业智能
    report_form: [
      { code: '44', cName: '数据报表', eName: 'dataReport', link: '/dataReport', icon: '' },
      { code: '45', cName: '智能终端管理', eName: 'itManagement', link: '/itManagement', icon: '' },
      { code: '46', cName: '商业智能', eName: 'businessIt', link: '/businessIt', icon: '' },
      { code: '47', cName: '数据挖掘', eName: 'dataMining', link: '/dataMining', icon: '' },
      { code: '48', cName: '系统设置', eName: 'systemSetupIT', link: '/systemSetupIT', icon: '' },
    ],
  },
};

export default data;
