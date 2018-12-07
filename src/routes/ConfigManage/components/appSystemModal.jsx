import React, { Component } from 'react';
import { Modal, Form, Input, Spin } from 'antd';
import FormTree from './formTree';

let _ = require('lodash');

const FormItem = Form.Item;
const options = {
  onFieldsChange(props, changedFields) {
    // props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return props.appSystemInfo && JSON.stringify(props.appSystemInfo) !== '{}'
      ? {
          systemName: Form.createFormField({ value: props.appSystemInfo.systemName }),
          remark: Form.createFormField({ value: props.appSystemInfo.remark }),
          norm: Form.createFormField({ value: props.appSystemInfo.norm }),
        }
      : {};
  },
  onValuesChange(_, values) {
    // console.log(values);
  },
};

@Form.create(options)
export default class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  okHandle = () => {
    const { form, handleAdd, appSystemInfo } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const result = appSystemInfo ? { key: appSystemInfo.key, ...fieldsValue } : fieldsValue;
      handleAdd(result);
    });
  };
  cancelHandle = () => {
    const { form, handleModalVisible } = this.props;
    form.resetFields();
    handleModalVisible();
  };
  handleTreeCheck = checkedKeys => {
    // let { norm } = this.props.appSystemInfo;
    // norm = checkedKeys;
    console.log(checkedKeys);
  };
  render() {
    const { modalVisible, form, title, loading } = this.props;
    const { getFieldDecorator } = form;
    const treeData = [
      {
        title: '父节点1',
        key: 'efwa',
        level: 1,
        child: [
          {
            title: '子节点1',
            key: 'awfe',
            level: 2,
            child: [{ title: '子子节点1', key: 'dassx', level: 3 }],
          },
          { title: '子节点2', key: 'eafdssz', level: 2 },
        ],
      },
      {
        title: '父节点2',
        key: 'liuh',
        level: 1,
        child: [
          { title: '子节点1', key: 'dfzsbzz', level: 2 },
          { title: '子节点2', key: 'fspoqz', level: 2 },
        ],
      },
    ];
    return (
      <Modal title={title} visible={modalVisible} onOk={this.okHandle} onCancel={this.cancelHandle}>
        <Spin spinning={loading}>
          <Form>
            <FormItem label="系统名称">
              {getFieldDecorator('systemName', {
                rules: [{ required: true, message: 'Please input some description...' }],
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem label="备注">
              {getFieldDecorator('remark', {
                rules: [{ required: true, message: 'Please input some description...' }],
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem label="指标">
              {getFieldDecorator('norm', {
                rules: [{ required: true, message: 'Please input some description...' }],
              })(<FormTree treeData={treeData} />)}
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

// import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import { Modal, Button, Form, Input } from 'antd';
// import FormTree from './formTree';

// const FormItem = Form.Item;

// class DefineModal extends PureComponent {
//   static propTypes = {
//     // modifyModalVisible: PropTypes.bool,
//     treeData: PropTypes.arrayOf(PropTypes.object),
//     record: PropTypes.shape({
//       systemName: PropTypes.string,
//       remark: PropTypes.string,
//       norm: PropTypes.array,
//     }),
//     unChange: PropTypes.bool,
//   };

//   static defaultProps = {
//     treeData: [
//       {
//         title: '父节点1',
//         key: 'efwa',
//         level: 1,
//         child: [
//           {
//             title: '子节点1',
//             key: 'awfe',
//             level: 2,
//             child: [{ title: '子子节点1', key: 'dassx', level: 3 }],
//           },
//           { title: '子节点2', key: 'eafdssz', level: 2 },
//         ],
//       },
//       {
//         title: '父节点2',
//         key: 'liuh',
//         level: 1,
//         child: [
//           { title: '子节点1', key: 'dfzsbzz', level: 2 },
//           { title: '子节点2', key: 'fspoqz', level: 2 },
//         ],
//       },
//     ],
//     record: {
//       systemName: '',
//       remark: '',
//       norm: [],
//     },
//     unChange: false,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       modifyModalVisible: false,
//     };
//   }

//   componentDidMount() { }

//   // componentWillReceiveProps(props, nextProps) {

//   // }

//   // 确定
//   okHandle = () => {
//     const { form, handleCheck } = this.props;
//     form.validateFields((err, fieldsValue) => {
//       if (err) return;
//       form.resetFields();
//       handleCheck(fieldsValue);
//       this.setState({
//         modifyModalVisible: false,
//       });
//     });
//   };
//   // 修改的 modal
//   handleModalVisible = flag => {
//     this.setState({
//       modifyModalVisible: !flag,
//     });
//   };
//   // 取消modal
//   handleModalCancel = form => {
//     this.setState({
//       // formValues: {},
//       modifyModalVisible: false,
//     });
//     form.resetFields();
//   };
//   render() {
//     const { btnName, icon } = this.props;
//     const { treeData, form, record, unChange } = this.props;

//     const { modifyModalVisible } = this.state;

//     const { systemName, remark, norm } = record;
//     const { getFieldDecorator } = form;

//     return (
//       <div>
//         <Button icon={icon} type="primary" onClick={() => this.handleModalVisible(false)}>
//           {btnName}
//         </Button>
//         <Modal
//           title="新建规则"
//           visible={modifyModalVisible}
//           onOk={this.okHandle}
//           onCancel={() => this.handleModalCancel(form)}
//         >
//           <Form>
//             <FormItem label="系统名称">
//               {getFieldDecorator('systemName', {
//                 initialValue: systemName,
//                 rules: [{ required: true, message: 'Please input some description...' }],
//               })(<Input disabled={unChange} placeholder="请输入" />)}
//             </FormItem>
//             <FormItem label="备注">
//               {getFieldDecorator('remark', {
//                 initialValue: remark,
//                 rules: [{ required: true, message: 'Please input some description...' }],
//               })(<Input placeholder="请输入" />)}
//             </FormItem>
//             <FormItem label="指标">
//               {getFieldDecorator('norm', {
//                 initialValue: norm,
//                 rules: [{ required: true, message: 'Please input some description...' }],
//               })(<FormTree treeData={treeData} />)}
//             </FormItem>
//           </Form>
//         </Modal>
//       </div>
//     );
//   }
// }
// const Index = Form.create()(DefineModal);
// export default Index;
