import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types'
import { echartsConfig } from './echartsConfig';

class Index extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
    this.container = null;
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    echartsConfig(this.container, nextProps.dataSource);
  }

  render() {
    const divProps = {
      className: this.props.className,
    };
    return (
      <div
        ref={e => {
          this.container = e;
        }}
        id="echatrs"
        {...divProps}
      >
        {}
      </div>
    );
  }
}
export default Index;
