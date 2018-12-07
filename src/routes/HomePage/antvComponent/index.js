import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { registIconNetNode } from './antvConfig';

// Warn if overriding existing method
if (Array.prototype.equals)
  console.warn(
    "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
  );
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function(array) {
  // if the other array is a falsy value, return
  if (!array) return false;
  // compare lengths - can save a lot of time
  if (this.length != array.length) return false;
  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, 'equals', { enumerable: false });

class Index extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    dataSource: PropTypes.object,
  };

  static defaultProps = {
    type: 'iconNet',
    dataSource: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.containerID = null;
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    const { dataSource } = nextProps;
    const boolA =
      Array.isArray(dataSource.nodes) &&
      dataSource.nodes.length > 0 &&
      !this.props.dataSource.nodes.equals(nextProps.dataSource.nodes);

    const boolB =
      Array.isArray(dataSource.edges) &&
      dataSource.edges.length > 0 &&
      !this.props.dataSource.edges.equals(nextProps.dataSource.edges);

    if (dataSource && (boolA || boolB)) {
      registIconNetNode(this.containerID.id, dataSource.nodes, dataSource.edges);
    }
  }

  render() {
    return (
      <div
        ref={e => {
          this.containerID = e;
        }}
        id="c1"
        style={{ height: '270px' }}
      >
        {null}
      </div>
    );
  }
}
export default Index;
