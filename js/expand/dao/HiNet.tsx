import NavigationUtil from '../../util/NavigationUtil';
import Storage from '../../util/storage';
import Constants from './Constants';

/**
 * 发送GET请求
 * @param api 要请求的接口
 * @returns
 */
export function get(api: string) {
  return async (params?: Record<string, any>) => {
    const boarding = await Storage.getItem('boarding-pass');
    const {headers, baseUrl} = Constants;
    const authHeader = await headers.Authorization;

    const finalHeaders: HeadersInit = {
      ...headers,
      Authorization: await authHeader,
      'boarding-pass': boarding || '',
    };

    return handleData(
      fetch(buildParams(baseUrl + api, params), {
        headers: finalHeaders,
      })
    );
  };
}

/**
 * 发送POST请求
 * @param api 要请求的接口
 * @returns
 */
export function post(api: string) {
  return (params: Record<string, any>) => {
    return async (queryParams?: Record<string, any> | string) => {
      const boarding = await Storage.getItem('boarding-pass');
      const {headers, baseUrl} = Constants;
      const authHeader = await headers.Authorization;

      let data;
      let cType;

      if (params instanceof FormData) {
        data = params;
        cType = 'multipart/form-data';
      } else {
        data = JSON.stringify(params);
        cType = 'application/json';
      }

      const finalHeaders: HeadersInit = {
        ...headers,
        'content-type': cType,
        Authorization: await authHeader,
        'boarding-pass': boarding || '',
      };

      return handleData(
        fetch(buildParams(baseUrl + api, queryParams), {
          method: 'POST',
          body: data,
          headers: finalHeaders,
        })
      );
    };
  };
}

/**
 * 发送PUT请求
 * @param api 要请求的接口
 * @returns
 */
export function put(api: string) {
  return (params: Record<string, any>) => {
    return async (queryParams?: Record<string, any> | string) => {
      const boarding = await Storage.getItem('boarding-pass');
      const {headers, baseUrl} = Constants;
      const authHeader = await headers.Authorization;

      const finalHeaders: HeadersInit = {
        ...headers,
        'content-type': 'application/json',
        Authorization: await authHeader,
        'boarding-pass': boarding || '',
      };

      return handleData(
        fetch(buildParams(baseUrl + api, queryParams), {
          method: 'PUT',
          body: JSON.stringify(params),
          headers: finalHeaders,
        })
      );
    };
  };
}

/**
 * 发送DELETE请求
 * @param api 要请求的接口
 * @returns
 */
export function remove(api: string) {
  return async (params?: Record<string, any>) => {
    const boarding = await Storage.getItem('boarding-pass');
    const {headers, baseUrl} = Constants;
    const authHeader = await headers.Authorization;

    const finalHeaders: HeadersInit = {
      ...headers,
      Authorization: await authHeader,
      'boarding-pass': boarding || '',
    };

    return handleData(
      fetch(buildParams(baseUrl + api, params), {
        method: 'DELETE',
        headers: finalHeaders,
      })
    );
  };
}

/**
 * 处理接口请求数据
 * @param doAction
 * @returns
 */
function handleData(doAction: Promise<Response>) {
  return new Promise((resolve, reject) => {
    doAction
      .then(res => {
        const type = res.headers.get('Content-Type');
        if ((type || '').indexOf('json') !== -1) {
          return res.json();
        }
        return res.text();
      })
      .then(result => {
        if (typeof result === 'string') {
          throw new Error(result);
        }
        const {code, msg, data: {list = undefined} = {}} = result;
        if (code === 401) {
          NavigationUtil.login();
          return;
        }
        resolve(list || result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * 构建url参数
 * @param url
 * @param params
 * @returns
 */
function buildParams(
  url: string,
  params?: Record<string, any> | string
): string {
  const newUrl = new URL(url);
  let finalUrl;

  if (typeof params === 'object') {
    for (const [key, value] of Object.entries(params)) {
      newUrl.searchParams.append(key, value as string);
    }
    finalUrl = newUrl.toString();
  } else if (typeof params === 'string') {
    finalUrl = url.endsWith('/') ? url + params : url + '/' + params;
  } else {
    finalUrl = newUrl.toString();
  }

  return finalUrl;
}

export default {get, post, put, remove};
