// action/popular/index.ts
import Types from '../types';
import DataStore, {FLAG_STORAGE} from '../../expand/dao/DataStore';
import {_projectModels, handleData} from '../ActionUtil';

/**
 * 获取最热数据的异步action
 * @param storeName
 * @param url
 * @param pageSize
 * @param favoriteDao
 * @returns {function(*=)}
 */
export function onRefreshPopular(
  storeName: string,
  url: string,
  pageSize: number,
  favoriteDao: any
) {
  return async (dispatch: any) => {
    dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
    const dataStore = new DataStore();
    try {
      const data = await dataStore.fetchData(url, FLAG_STORAGE.flag_popular);
      handleData(
        Types.POPULAR_REFRESH_SUCCESS,
        dispatch,
        storeName,
        data,
        pageSize,
        favoriteDao
      );
    } catch (error) {
      dispatch({
        type: Types.POPULAR_REFRESH_FAIL,
        storeName,
        error,
      });
    }
  };
}

/**
 * 加载更多
 * @param storeName
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 * @param favoriteDao
 * @returns {function(*)}
 */
export function onLoadMorePopular(
  storeName: string,
  pageIndex: number,
  pageSize: number,
  dataArray: any[] = [],
  favoriteDao: any,
  callBack: (error: string) => void
) {
  return async (dispatch: any) => {
    if ((pageIndex - 1) * pageSize >= dataArray.length) {
      if (typeof callBack === 'function') {
        callBack('no more');
      }
      dispatch({
        type: Types.POPULAR_LOAD_MORE_FAIL,
        storeName,
        error: 'no more',
        pageIndex: --pageIndex,
      });
    } else {
      const max =
        pageSize * pageIndex > dataArray.length
          ? dataArray.length
          : pageSize * pageIndex;
      _projectModels(
        dataArray.slice(0, max),
        favoriteDao,
        (projectModels: any[]) => {
          dispatch({
            type: Types.POPULAR_LOAD_MORE_SUCCESS,
            storeName,
            pageIndex,
            projectModels,
          });
        }
      );
    }
  };
}
