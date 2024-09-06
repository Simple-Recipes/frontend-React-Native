import AsyncStorage from '@react-native-async-storage/async-storage';
import {getBoarding} from '../../util/BoardingUtil';
import {ApiResponse, WrappedData} from '../types/apiTypes';
import hinet from '../dao/HiNet';

export const FLAG_STORAGE = {flag_popular: 'popular'};

export default class DataStore {
  fetchData(
    url: string | undefined,
    flag: string,
    userToken?: string,
    params?: {
      ingredients: string[];
      includeAllIngredients: boolean;
      maxTime: number;
      preference: string;
    }
  ): Promise<WrappedData> {
    return new Promise((resolve, reject) => {
      if (!url) {
        return reject(new Error('URL is undefined'));
      }

      this.fetchLocalData(url)
        .then((wrapData: WrappedData) => {
          if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
            resolve(wrapData);
          } else {
            this.fetchNetData(url, flag)
              .then((data: ApiResponse) => {
                resolve(this._wrapData(data));
              })
              .catch(error => {
                reject(error);
              });
          }
        })
        .catch(error => {
          this.fetchNetData(url, flag)
            .then((data: ApiResponse) => {
              resolve(this._wrapData(data));
            })
            .catch(error => {
              reject(error);
            });
        });
    });
  }

  async fetchNetData(url: string, flag: string): Promise<ApiResponse> {
    try {
      // 使用 hinet 发起请求，确保返回的数据类型是 ApiResponse
      const response = await hinet.get(url)();
      return response as ApiResponse;
    } catch (error) {
      console.error('Network error while fetching data:', error); // 打印详细的错误信息
      throw new Error('Failed to fetch network data');
    }
  }

  saveData(url: string, data: any) {
    if (!data || !url) return;
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)));
  }

  fetchLocalData(url: string): Promise<WrappedData> {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            if (result !== null && result !== undefined) {
              resolve(JSON.parse(result));
            } else {
              reject(new Error('No data found'));
            }
          } catch (e) {
            reject(e);
          }
        } else {
          reject(error);
        }
      });
    });
  }

  _wrapData(data: ApiResponse): WrappedData {
    return {data: data.data, timestamp: new Date().toISOString()};
  }

  static checkTimestampValid(timestamp: string): boolean {
    const currentDate = new Date();
    const targetDate = new Date(timestamp);
    if (currentDate.getMonth() !== targetDate.getMonth()) return false;
    if (currentDate.getDate() !== targetDate.getDate()) return false;
    if (currentDate.getHours() - targetDate.getHours() > 4) return false;
    return true;
  }
}
