import 'isomorphic-fetch';
import encodeurl from 'encodeurl';
//import Url from 'url';

let defaultOption = {
  // protocal: 'http',
  // host: '127.0.0.1',
  // port: '80',
  heaers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Connection: 'Keep-Alive',
  },
};
function buildUrl(path, option) {
  if (!path.match(/^\//)) {
    path = '/' + path;
  }
  let newOptions = Object.assign({}, defaultOption, option);
  let url = `${newOptions.protocal}://${newOptions.host}:${newOptions.port}${newOptions.path}`;
  return encodeurl(url);
}

function buildHeaders(option) {
  let defaultHeaders = defaultOption.heaers;
  if (option && option.headers) {
    return Object.assign({}, defaultHeaders, option.headers);
  } else {
    return defaultHeaders;
  }
}

const webApi = {
  setDefaultOption: option => {
    if (option) {
      defaultOption = option;
    }
  },

  checkHttpStatus: response => {
    if (response.status) {
      return response;
    }
    /*
        let error = new Error(response.statusText);
        let status = response.status;
        if (status >= 200 && status < 300) {
            return response;
        }
        else if (status == 400) {
            error.type = "validation";
        }
        else if (status == 401) {
            error.type = "validation";
        }
        else if (status == 403) {
            error.type = "forbidden";
        }
        else if (status == 500) {
            error.type = "server";
        }

        error.response = response;

        throw error;*/
  },
  checkApiResult: json => {
    return json;
  },
  get0: (path, option, credentials = 'same-origin') => {
    let url = buildUrl(path, option);
    return fetch(url, {
      credentials,
      method: 'GET',
      headers: buildHeaders(option),
    })
      .then(response => webApi.checkHttpStatus(response))
      .then(response => response.json())
      .then(webApi.checkApiResult);
  },

  get: (url, headers, credentials = 'same-origin') => {
    url = encodeurl(url);
    return fetch(url, {
      credentials,
      method: 'GET',
      headers: buildHeaders(headers),
    })
      .then(response => webApi.checkHttpStatus(response))
      .then(response => response.json())
      .then(webApi.checkApiResult);
  },
  post: (url, data, headers, credentials = 'same-origin') => {
    url = encodeurl(url);
    return fetch(url, {
      credentials,
      method: 'POST',
      headers: buildHeaders(headers),
      body: JSON.stringify(data),
    })
      .then(response => webApi.checkHttpStatus(response))
      .then(response => response.json())
      .then(webApi.checkApiResult);
  },
  put: (url, data, headers, credentials = 'same-origin') => {
    url = encodeurl(url);
    return fetch(url, {
      credentials,
      method: 'PUT',
      headers: buildHeaders(headers),
      body: JSON.stringify(data),
    })
      .then(response => webApi.checkHttpStatus(response))
      .then(response => response.json())
      .then(webApi.checkApiResult);
  },
  del: (url, data, headers, credentials = 'same-origin') => {
    url = encodeurl(url);
    return fetch(url, {
      credentials,
      method: 'DELETE',
      headers: buildHeaders(headers),
      body: JSON.stringify(data),
    })
      .then(response => webApi.checkHttpStatus(response))
      .then(response => response.json())
      .then(webApi.checkApiResult);
  },
};

export default webApi;
