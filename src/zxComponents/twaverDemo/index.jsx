import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MyModal from './myModal';

export default class Index extends Component {
  static propTypes = {
    //prop: PropTypes
  };
  state = {};
  componentDidMount() {}

  getElementPosition(element) {
    var actuaLeft = element.offsetLeft;
    var actuaTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
      actuaLeft += current.offsetLeft;
      actuaTop += current.offsetTop;
      current = current.offsetParent;
    }
    return { x: actuaLeft, y: actuaTop };
  }
  render() {
    return (
      <div>
        <MyModal />
      </div>
    );
  }
}
