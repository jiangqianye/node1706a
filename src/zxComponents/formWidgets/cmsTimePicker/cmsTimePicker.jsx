import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimePicker } from 'antd';
import moment from 'moment';

export default class CmsTimePicker extends Component {
  constructor(props) {
    super(props);

    let value = props.value ? props.value : { startValue: '00:00:00', endValue: '00:00:00' };
    this.state = {
      startValue: value.startValue,
      endValue: value.endValue,
    };
    this.timeFormat = 'HH:mm:ss';
  }

  static propTypes = {};
  static defaultProp = {};
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value) {
      this.setState({
        startValue: nextProps.value.startValue,
        endValue: nextProps.value.endValue,
      });
    }
  }
  onChangeStartTime(time, timeString) {
    this.onChange('endValue', dateStr);
  }
  onChangeEndTime(time, timeString) {
    this.onChange('startValue', dateStr);
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

  render() {
    const { startValue, endValue } = this.state;
    return (
      <div>
        <TimePicker
          allowEmpty={false}
          onChange={onChangeStartTime.bind(this)}
          defaultOpenValue={moment(startValue, this.timeFormat)}
        />
        <span>~</span>
        <TimePicker
          allowEmpty={false}
          onChange={onChangeEndTime.bind(this)}
          defaultOpenValue={moment(endValue, this.timeFormat)}
        />
      </div>
    );
  }
}
