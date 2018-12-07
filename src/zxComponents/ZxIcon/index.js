import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import styes from './index.less';

class Index extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  static defaultProps = {
    title: '正常运行',
  };

  renderIcon(title) {
    const datas = [
      { title: '正常', colorBg: 'tag_success', iconType: 'check-circle' },
      { title: '正常运行', colorBg: 'tag_success', iconType: 'check-circle' },
      { title: '连接正常', colorBg: 'tag_success', iconType: 'check-circle' },
      { title: '采集成功', colorBg: 'tag_success', iconType: 'check-circle' },
      { title: '同步成功', colorBg: 'tag_success', iconType: 'check-circle' },
      { title: '成功', colorBg: 'tag_success', iconType: 'check-circle' },

      { title: '未检测', colorBg: 'tag_warning', iconType: 'close-circle' },
      { title: '未知状态', colorBg: 'tag_warning', iconType: 'question-circle' },

      { title: '连接异常', colorBg: 'tag_error', iconType: 'close-circle' },
      { title: '异常运行', colorBg: 'tag_error', iconType: 'close-circle' },
      { title: '异常', colorBg: 'tag_error', iconType: 'close-circle' },

      { title: '运行失败', colorBg: 'tag_error', iconType: 'close-circle' },
      { title: '运行成功', colorBg: 'tag_success', iconType: 'check-circle' },
      { title: '运行中', colorBg: 'tag_info', iconType: 'info-circle' },
      { title: '带上传', colorBg: 'tag_info', iconType: 'info-circle' },
      { title: '未运行', colorBg: 'tag_warning', iconType: 'exclamation-circle' },
    ];
    const paramTitle = title.length > 4 ? title.slice(0, 4) : title;
    const exitData = datas.filter(item => item.title === paramTitle);

    if (exitData.length > 0) {
      return (
        <div className={styes[`${exitData[0].colorBg}`]}>
          <Icon type={exitData[0].iconType} />
          <span className={styes.tag_text}>{title}</span>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return this.renderIcon(this.props.title);
  }
}

export default Index;
