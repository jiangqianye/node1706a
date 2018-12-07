import React, { Component } from 'react';
import { expect, assert } from 'chai';
/*
render 渲染静态html
shallow 渲染成react组件 只渲染当前组件
mount  渲染成react组件, 渲染当前组件及所有子组件，耗时长，适用于存在DOM交互的组件
*/
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import { spy } from 'sinon';

import FormItemName from '../index';

import FormWidgetTest from '../../formWidgetTest';

describe('<FormItemName />', function() {
  let props, comp;
  before(function() {
    props = {
      attribute: {
        fieldId: 'userName',
        label: '用户名',
        palceholder: '请输入用户名',
      },
      callback: spy(),
    };
    comp = mount(<FormWidgetTest {...props} />);
  });

  it('测试label正常显示', function() {
    expect(comp.find('.ant-form-item-label > label').text()).to.equal(props.attribute.label);
  });

  it('测试palceholder正常显示', function() {
    expect(comp.find('input').props('palceholder')).to.equal(props.attribute.palceholder);
  });

  it('测试默认初始值并提交成功', function() {
    const { fieldId, initialValue } = props.attribute;
    const value = { [fieldId]: initialValue };
    comp.find('button').simulate('click');
    expect(props.callback.withArgs(value).calledOnce).to.be.true;
  });

  it('测试必填时有一个红色星号的样式', function() {
    const attribute = { ...props.attribute, required: true };
    comp.setProps({ attribute });
    expect(comp.find('.ant-form-item-required')).to.have.length(1);
  });

  it('测试输入非法字符串', function() {
    comp.find('input').simulate('change', { target: { value: '!@#输入值' } });
    comp.find('button').simulate('click');
    expect(props.callback.withArgs('error').calledOnce).to.be.true;
  });

  if (
    ('测试输入合法字符串',
    function() {
      const { fieldId } = props.attribute;
      const value = { [fieldId]: 'asdfasd合法输入' };
      comp.find('input').simulate('change', { target: { value } });
      comp.find('button').simulate('click');
      expect(props.callback.withArgs(value).calledOnce).to.be.true;
    })
  )
    it('测试必填时，非空验证', function() {
      const value = 'error';
      const attribute = { ...props.attribute, required: true, initialValue: '' };
      comp.setProps({ attribute });
      comp.find('button').simulate('click');
      expect(props.callback.withArgs(value).calledOnce).to.be.true;
    });

  it('HTML快照', function() {
    expect(renderer.create(<FormWidgetTest {...props} />).toJSON()).to.matchSnapshot();
  });
});
