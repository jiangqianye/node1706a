export default class UrlParamMethod {
  constructor() {}
  //设置 参数
  setParam(namea, value) {
    let search = location.search,
      pathName = location.pathname,
      newAddress = '',
      reg = new RegExp('(^|)' + name + '=([^&*])(|$)'),
      tmp = name + '=' + value;

    if (reg.test(search)) {
      newAddress = pathName + search.replace(eval(reg), tmp);
    } else {
      if (search.match('[?]')) {
        newAddress = pathName + search + '&' + tmp;
      } else {
        newAddress = pathName + '?' + tmp;
      }
    }
    history.replaceState({ name: encodeURIComponent(value) }, 'title', newAddress);
  }
  //获取指定参数
  getParam(name) {
    if (name !== null && name.toString().length > 0) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      let paramter = window.location.search.substr(1).match(reg);
      if (paramter !== null) {
        return decodeURIComponent(paramter[2]);
      } else {
        return null;
      }
    }
  }
  //获取所有参数组成的一个对象
  getParamObject() {
    let qs = location.search.length > 0 ? location.search.substring(1) : '';
    //保存数据的对象
    let args = {};
    //取得每一项
    let items = qs.length ? qs.split('&') : [];
    let item = null,
      name = null,
      value = null;
    //逐个将每一项加到对象中
    items.forEach(child => {
      item = child.split('=');
      name = decodeURI(item[0]);
      value = decodeURI(item[1]);
      if (name.length) {
        args[name] = value;
      }
    });
    return args;
  }

  //移除参数
  removeParam(name) {
    let search = location.search,
      pathName = location.pathname,
      newAddress = '',
      paramObject = this.getParamObject(),
      isFirst = true;

    if (paramObject[name] !== undefined) {
      delete paramObject[name];
      for (let i in paramObject) {
        if (isFirst) {
          newAddress = pathName + '?' + i + '=' + paramObject[i];
          isFirst = false;
        } else {
          newAddress = pathName + '&' + i + '=' + paramObject[i];
        }
      }
      history.replaceState(paramObject, 'title', encodeURIComponent(newAddress));
    }
  }
}
