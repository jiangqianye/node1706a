import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MyTable from './myTable';

export default class Index extends Component {
  static propTypes = {
    //prop: PropTypes
  };
  state = { dataSource: [] };
  componentDidMount() {
    let sqlData = [
      {
        code: '0',
        cName: '分类名称0',
        children: [
          { code: '01', cName: '子节点名称01阿萨德法师法师的', parentCode: '', children: [] },
          { code: '02', cName: '子节点名称02过分的话法国队和', parentCode: '', children: [] },
          { code: '03', cName: '子节点名称03阿斯蒂芬', parentCode: '', children: [] },
        ],
      },
      {
        code: '1',
        cName: '分类名称1',
        children: [
          {
            code: '11',
            cName: '子节点名称11电饭锅和豆腐干',
            parentCode: '',
            children: [
              {
                code: '11.1',
                cName: '子节点的第大发光火烦得很二级名称11.1',
                parentCode: '01',
                children: [],
              },
              { code: '11.2', cName: '子节点的第二级名称11.2', parentCode: '02', children: [] },
              { code: '11.3', cName: '子节点的第二级名称11.3', parentCode: '', children: [] },
              { code: '11.4', cName: '子节点的第二级名称11.4', parentCode: '02', children: [] },
              { code: '11.5', cName: '子节点的第二级名称11.5', parentCode: '', children: [] },
            ],
          },
          {
            code: '12',
            cName: '子节点名称12',
            parentCode: '',
            children: [
              { code: '12.1', cName: '子节点的第二级名称12.1', parentCode: '01', children: [] },
              { code: '12.2', cName: '子节点的第二级名称12.2', parentCode: '02', children: [] },
              { code: '12.3', cName: '子节点的第二级名称12.3', parentCode: '02', children: [] },
              { code: '12.4', cName: '子节点的第二级名称12.4', parentCode: '02', children: [] },
            ],
          },
        ],
      },
    ];
    let tpContainer = document.getElementById('tpContainer');
    let tpbody = document.getElementById('tpbody');
    // let tpContainer = this.tpContainer.current
    // let tpbody = this.tpbody.current
    // console.log(tpContainer)
    if (tpContainer && tpContainer) {
      init(sqlData, this.handleClickElement.bind(this), tpContainer, tpbody); // eslint-disable-line
    }
  }
  handleClickElement(datas) {
    let dataSource = datas.map(item => {
      return {
        key: item.code,
        ...item,
      };
    });
    this.setState({ dataSource });
  }
  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <div
          id="tpContainer"
          ref={this.tpContainer}
          style={{ width: '902px', height: '602px', border: '1px solid red' }}
        >
          <div id="tpbody" ref={this.tpbody} style={{ width: '100%', height: '100%' }} />
        </div>
        <MyTable dataSource={dataSource} />
      </div>
    );
  }
}
