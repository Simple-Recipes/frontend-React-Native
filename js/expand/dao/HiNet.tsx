import NavigationUtil from '../../util/NavigationUtil';
import Storage from '../../util/storage';
import {ApiResponse} from '../types/apiTypes';
import Constants from './Constants';

/**
 * 发送GET请求
 * @param api 要请求的接口
 * @returns
 */
export function get(api: string) {
  return async (params?: Record<string, any>) => {
    const boarding = await Storage.getItem('boarding-pass'); // 从本地存储中获取 JWT token
    const {headers, baseUrl} = Constants;

    // 设置 User-Token 头，直接发送 JWT token，不加 Bearer 前缀
    const authHeader = boarding;

    console.log('JWT token in request (User-Token):', authHeader); // 打印 token 确认

    const finalHeaders: HeadersInit = {
      ...headers,
      'User-Token': authHeader, // 将 token 放入 User-Token 头
    };

    // 确认 baseUrl 拼接正确
    console.log('Final URL:', buildParams(baseUrl + api, params));

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
  return async (params: Record<string, any>) => {
    const boarding = await Storage.getItem('boarding-pass'); // 从本地存储中获取 JWT token
    const {headers, baseUrl} = Constants;

    const authHeader = boarding; // JWT token

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
      'User-Token': authHeader,
    };

    // Ensure the POST request is returning a promise and not a function
    return handleData(
      fetch(buildParams(baseUrl + api), {
        method: 'POST',
        body: data,
        headers: finalHeaders,
      })
    );
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

      const authHeader = boarding; // 直接使用 JWT token，不加 Bearer 前缀

      const finalHeaders: HeadersInit = {
        ...headers,
        'content-type': 'application/json',
        'User-Token': authHeader, // 将 token 放入 User-Token 头
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

    const authHeader = boarding; // 直接使用 JWT token，不加 Bearer 前缀

    const finalHeaders: HeadersInit = {
      ...headers,
      'User-Token': authHeader, // 将 token 放入 User-Token 头
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
function handleData(doAction: Promise<Response>): Promise<ApiResponse> {
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

        // 确保 result 是 ApiResponse 类型
        const {code, msg, data} = result as ApiResponse;

        if (code === 401) {
          NavigationUtil.login();
          return;
        }

        // 返回完整的 ApiResponse 数据
        resolve(result as ApiResponse);
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
    // 修复此处逻辑，避免多余的斜杠
    finalUrl = url.endsWith('/') ? url + params : `${url}/${params}`;
  } else {
    finalUrl = newUrl.toString();
  }

  // 确保 URL 没有多余的 "/"
  finalUrl = finalUrl.replace(/\/$/, ''); // 移除结尾的斜杠

  return finalUrl;
}

export default {get, post, put, remove};
