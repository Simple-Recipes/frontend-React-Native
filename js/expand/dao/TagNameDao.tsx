import AsyncStorage from '@react-native-async-storage/async-storage';
import tagnames from '../../res/data/tagnames.json';

export const FLAG_TAGNAME = {flag_tagname: 'tagname_dao'};

export default class TagNameDao {
  flag: string;

  constructor(flag: string) {
    this.flag = flag;
  }

  /**
   * 获取标签名
   * @returns {Promise<any>}
   */
  fetch() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.flag, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          const data = this.flag === FLAG_TAGNAME.flag_tagname ? tagnames : [];
          this.save(data);
          resolve(data);
        } else {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(error);
          }
        }
      });
    });
  }

  /**
   * 保存标签名
   * @param objectData
   */
  save(objectData: any) {
    const stringData = JSON.stringify(objectData);
    AsyncStorage.setItem(this.flag, stringData, (error: any) => {
      if (error) {
        console.error('Failed to save data', error);
      }
    });
  }
}
