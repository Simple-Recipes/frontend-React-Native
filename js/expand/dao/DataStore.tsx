import AsyncStorage from '@react-native-async-storage/async-storage';
import {getBoarding} from '../../util/BoardingUtil';
import {Callback} from '@react-native-async-storage/async-storage/lib/typescript/types';
import {ApiResponse, WrappedData} from '../types/apiTypes';

export const FLAG_STORAGE = {flag_popular: 'popular'};

export default class DataStore {
  fetchData(url: string | undefined, flag: string): Promise<WrappedData> {
    return new Promise((resolve, reject) => {
      if (!url) {
        return reject(new Error('URL is undefined'));
      }

      this.fetchLocalData(url)
        .then((wrapData: WrappedData) => {
          console.log('Local Data:', wrapData);
          if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
            resolve(wrapData);
          } else {
            this.fetchNetData(url, flag) // 在这里确保url是字符串
              .then((data: ApiResponse) => {
                console.log('Network Data:', data);
                resolve(this._wrapData(data));
              })
              .catch(error => {
                reject(error);
              });
          }
        })
        .catch(error => {
          this.fetchNetData(url, flag) // 在这里确保url是字符串
            .then((data: ApiResponse) => {
              console.log('Network Data:', data);
              resolve(this._wrapData(data));
            })
            .catch(error => {
              reject(error);
            });
        });
    });
  }

  saveData(url: string, data: any, callback?: Callback) {
    if (!data || !url) return;
    AsyncStorage.setItem(
      url,
      JSON.stringify(this._wrapData(data)),
      callback || (() => {})
    );
  }

  fetchLocalData(url: string): Promise<WrappedData> {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            if (result !== null && result !== undefined) {
              // 确保 result 是一个非空字符串
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

  async fetchNetData(url: string, flag: string): Promise<ApiResponse> {
    const token = await getBoarding();
    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then((responseData: ApiResponse) => {
          if (responseData.code === 1 && responseData.data) {
            this.saveData(url, responseData.data);
            resolve(responseData);
          } else {
            reject(new Error('Failed to fetch data'));
          }
        })
        .catch(error => {
          reject(error);
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
