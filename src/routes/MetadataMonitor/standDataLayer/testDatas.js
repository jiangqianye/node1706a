let tabDatas = [
  { key: '1', tab: '参与者主题域', children: [] },
  { key: '2', tab: '医疗服务主题域', children: [] },
  { key: '3', tab: '医疗事件主题域', children: [] },
  { key: '4', tab: '费用主题域', children: [] },
  { key: '5', tab: '事件主题域', children: [] },
  { key: '6', tab: '值域', children: [] },
];

const test_dataSource = {
  Participant: [
    {
      index: '1',
      code: '1',
      tableName: '门诊就诊人次',
      meaning: '统计当期时间维度门诊就诊总人次；按照就诊号统计',
      remarks: '备注',
    },
    { index: '2', code: '2', tableName: '门诊挂号人次', meaning: '指标说明2', remarks: '备注' },
    { index: '3', code: '3', tableName: '门诊检查人次', meaning: '指标说明2', remarks: '备注' },
    { index: '4', code: '4', tableName: '门诊检验人次', meaning: '指标说明2', remarks: '备注' },
  ],
  // //急诊人次
  // er: [
  //     { index: '1', code: '1', quotaName: '急诊就诊人次', quotaDescrib: '指标说明1' },
  //     { index: '2', code: '2', quotaName: '急诊检查人次', quotaDescrib: '指标说明2' }
  // ],
  // //住院人次
  // hospitalization: [
  //     { index: '1', code: '1', quotaName: '入院人次', quotaDescrib: '指标说明1' },
  //     { index: '2', code: '2', quotaName: '出院人次', quotaDescrib: '指标说明2' },
  //     { index: '3', code: '3', quotaName: '住院检查人次', quotaDescrib: '指标说明2' },
  // ],
};

const testData = { tabDatas, test_dataSource };

export default testData;
