import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/local/zh-cn';
moment.local('zh-cn');

const RangePicker = DatePicker.RangePicker;

//日期范围选择控件
export default class CmsDatePicker extends Component {
  static propTypes = {};
  static defaultProp = {};
  constructor(props) {
    super(props);
    let value = props.value ? props.value : { startValue: '', endValue: '' };
    this.state = {
      startValue: value.startValue,
      endValue: value.endValue,
      endOpen: false,
    };
    this.dateFormat = 'YYYY/MM/DD';
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value) {
      this.setState({
        startValue: nextProps.value.startValue,
        endValue: nextProps.value.endValue,
      });
    }
  }
  //不能选择的开始日期
  disabledStartDate(startValue) {
    let endValue = moment(this.state.endValue, this.dateFormat);
    if (!endValue || !startValue) {
      return false;
    }

    let timeDiff = endValue.valueOf() - startValue.valueOf();
    let result = 0 <= timeDiff && timeDiff < 86400000 * 30;
    return !result;
  }
  //不能选择结束日期
  disabledEndDate(endValue) {
    let startValue = moment(this.state.startValue, this.dateFormat);
    if (!endValue || !startValue) {
      return false;
    }

    let timeDiff = endValue.valueOf() - startValue.valueOf();
    let result = 0 <= timeDiff && timeDiff < 86400000 * 30;
    return !result;
  }
  onChange(field, value) {
    if (!('value' in this.props)) {
      this.setState({ [field]: value });
    }
    if (this.props.onChange) {
      const { startValue, endValue } = this.state;
      this.props.onChange({ startValue, endValue, [field]: value });
    }
  }
  onStartChange(value, dateStr) {
    this.onChange('startValue', dateStr);
  }
  onEndChange(value, dateStr) {
    this.onChange('endValue', dateStr);
  }
  handleStartOpenChange(open) {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }
  handleEndOpenChange(endOpen) {
    this.setState({ endOpen });
  }

  render() {
    let { startValue, endValue, endOpen } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'row', width: 240 }}>
        <DatePicker
          allClear={false}
          disabledDate={this.disabledStartDate.bind(this)}
          format={this.dateFormat}
          value={moment(startValue, dateFormat)}
          placeholder="开始日期"
          onChange={this.onStartChange.bind(this)}
          onOpenChange={this.handleStartOpenChange.bind(this)}
        />
        <span>~</span>
        <DatePicker
          allClear={false}
          disabledDate={this.disabledEndDate.bind(this)}
          format={this.dateFormat}
          value={moment(endValue, dateFormat)}
          placeholder="结束日期"
          onChange={this.onEndChange.bind(this)}
          onOpenChange={this.handleEndOpenChange.bind(this)}
        />
      </div>
    );
  }
}
