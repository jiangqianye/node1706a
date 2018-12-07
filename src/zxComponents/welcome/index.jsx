import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

export default class IndexExam extends Component {
  render() {
    return (
      <div className="index_container index_container_bg">
        <div className="topbar">
          <div className="">
            <img src={require('./images/logo_white.png')} alt="log" />
          </div>
          <h3>医疗数据元治理平台</h3>
        </div>
        <div className="slogan">
          <h1>医疗数据治理平台，实现医疗数据真正的价值</h1>
          <p>
            采用NLP自然语言算法，对生产源数据结构进行语义学习和翻译、模型匹配和对码，实现多源异构数据的结构化和标准化，完成数据接入；通过HIE(数据融合引擎)完成数据的抽取转换清洗；{' '}
            <br />
            通过数据抽取转换，形成数据仓库，及数据监控管理，完成数据的存取和管控。
          </p>
          <div className="index_use">
            <Link to="/login">马上使用</Link>
          </div>
        </div>
        <div className="footer">
          <p>
            已通过CCCI信息安全管理体系认证，符合ISO/IEC 27001:2005标准<br />
            蜀ICP备14017122号 Copyright 2016.
            <a href="http://www.standata.cn">成都智信电子技术有限公司</a> All rights reserved.
          </p>
        </div>
      </div>
    );
  }
}
