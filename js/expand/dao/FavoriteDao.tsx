import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITE_KEY_PREFIX = 'favorite_';

export default class FavoriteDao {
  private favoriteKey: string;

  constructor(flag: string) {
    this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
  }

  /**
   * 收藏项目,保存收藏的项目
   * @param key 项目id
   * @param value 收藏的项目
   */
  saveFavoriteItem(key: string, value: string): void {
    AsyncStorage.setItem(key, value, (error?: Error | null) => {
      if (!error) {
        // 更新Favorite的key
        this.updateFavoriteKeys(key, true);
      }
    });
  }

  /**
   * 更新Favorite key集合
   * @param key 项目id
   * @param isAdd true 添加,false 删除
   */
  updateFavoriteKeys(key: string, isAdd: boolean): void {
    AsyncStorage.getItem(
      this.favoriteKey,
      (error?: Error | null, result?: string | null) => {
        if (!error && result) {
          let favoriteKeys: string[] = [];
          if (result) {
            favoriteKeys = JSON.parse(result);
          }
          const index = favoriteKeys.indexOf(key);
          if (isAdd) {
            // 如果是添加且key不在存在则添加到数组中
            if (index === -1) {
              favoriteKeys.push(key);
            }
          } else {
            // 如果是删除且key存在则将其从数组中移除
            if (index !== -1) {
              favoriteKeys.splice(index, 1);
            }
          }
          AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
        }
      }
    );
  }

  /**
   * 获取收藏的项目对应的key
   * @return {Promise<string[]>}
   */
  getFavoriteKeys(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(
        this.favoriteKey,
        (error?: Error | null, result?: string | null) => {
          if (!error) {
            try {
              resolve(result ? JSON.parse(result) : []);
            } catch (e) {
              reject(e);
            }
          } else {
            reject(error);
          }
        }
      );
    });
  }

  /**
   * 取消收藏,移除已经收藏的项目
   * @param key 项目id
   */
  removeFavoriteItem(key: string): void {
    AsyncStorage.removeItem(key, (error?: Error | null) => {
      if (!error) {
        this.updateFavoriteKeys(key, false);
      }
    });
  }

  /**
   * 获取所有收藏的项目
   * @return {Promise<any[]>}
   */
  getAllItems(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.getFavoriteKeys()
        .then((keys: string[]) => {
          if (keys.length > 0) {
            AsyncStorage.multiGet(
              keys,
              (
                err?: readonly (Error | null)[] | null,
                stores?: readonly [string, string | null][] | undefined
              ) => {
                if (err) {
                  reject(err);
                  return;
                }
                const items =
                  stores
                    ?.map(store => {
                      const value = store[1];
                      return value ? JSON.parse(value) : null;
                    })
                    .filter(item => item !== null) || [];
                resolve(items);
              }
            );
          } else {
            resolve([]);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}
