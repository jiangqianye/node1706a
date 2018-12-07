import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Spin } from 'antd';

//属性代理方式高阶组件
const WrappedModal = WrappedComponent => {
  class Index extends Component {
    static propTypes = {
      code: PropTypes.string, //获取详情的code 必选
      webApiUrl: PropTypes.func, //一个函数，返回值是 获取/添加/修改 的API，必选
      dealGetData: PropTypes.func, //一个函数，返回值是处理后的详情数据，可选
      dealSubmitData: PropTypes.func, //一个函数，返回值是处理后要提交的数据，可选
      handleOk: PropTypes.func,
      handleCancel: PropTypes.func,
      disabled: PropTypes.bool, //按钮是否可点击
    };
    static defaultProps = {
      btnText: '弹出模态框',
    };

    constructor(props) {
      super(props);
      this.state = {
        //modal是否可见
        visible: false,
        //modal是否在加载中
        loading: false,
        //modal标题
        title: props.code ? '编辑' : '添加',
      };
    }

    componentDidMount() {}
    componentWillReceiveProps(nextProps) {}
    showModal = () => {
      this.setState({ visible: true });
      this.getDetailByCode();
    };
    handleOk = e => {
      e.preventDefault();
      // this.props.form.validateFields((err, values) => {
      //     if (!err) {

      //        if(this.props.handleAddOk){this.props.handleAddOk(values)}
      //     }
      // });

      /*
             const { dealSubmitData, code, webApiUrl, handleOk } = this.props;
             let method = code ? 'post' : 'put';
             if (webApiUrl) {
                 this.props.form.validateFields((err, values) => {
                     if (!err) {
                         let newData = dealSubmitData ? dealSubmitData(values) : values;
                         webApi[method](webApiUrl(newData), newData).then((result) => {
                             if (result.flag) {
                                 this.setState({ visible: false })
                                 this.props.form.resetFields();
                                 if (handleOk) {
                                     let message = method === 'post' ? '添加成功' : '修改成功';
                                     handleOk(message)
                                 }
                             } else { message.error(result.errorMessage) }
                         }).catch((error) => { throw new Error('webApiUrl: ' + error) })
                     }
                 });
             } else { throw new Error('请传入webapiUrl参数') }
             */
    };
    handleCancel = e => {
      this.setState({
        visible: false,
      });

      if (this.props.handleCancel) {
        this.props.handleCancel();
      }
    };

    //-----根据Code获取详细信息------
    getDetailByCode() {
      // const {
      //     code,
      //     webApiUrl,
      //     dealGetData,
      // } = this.props;
      // if (code && webApiUrl) {
      //     this.setState({ loading: true })
      //     webApi.get(webApiUrl(code)).then((result) => {
      //         if (result.flag && result.returnValue) {
      //             let returnData = dealGetData ? dealGetData(result.returnValue) : result.returnValue;
      //             this.setState({ loading: false })
      //         } else { message.error(result.errorMessage) }
      //     }).catch((error) => message.error('getDetailByCodeAPI: ' + error))
      // }
    }

    render() {
      const { title, visible, loading } = this.state;
      const { disabled, btnText } = this.props;
      return (
        <div>
          <Button type="primary" disabled={disabled} onClick={this.showModal}>
            {btnText}
          </Button>
          <Modal
            title={title}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            confirmLoading={loading}
            maskClosable={false}
          >
            <Spin spinning={loading}>
              <WrappedComponent
                {...this.props}
                handleOk={this.handleOk.bind(this)}
                visible={visible}
              />
            </Spin>
          </Modal>
        </div>
      );
    }
  }

  return Index;
};

export default WrappedModal;
