import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'theme';

export default class ThemeDao {
  /**
   * 获取当前主题
   * @returns {Promise<any>}
   */
  getTheme() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(THEME_KEY, (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result) {
            try {
              resolve(JSON.parse(result));
            } catch (e) {
              reject(e);
            }
          } else {
            resolve(this.defaultTheme());
          }
        }
      });
    });
  }

  /**
   * 保存主题
   * @param theme
   * @returns {Promise<void>}
   */
  saveTheme(theme: any) {
    AsyncStorage.setItem(THEME_KEY, JSON.stringify(theme));
  }

  /**
   * 默认主题
   * @returns {{colors: {primary: string, background: string, card: string, text: string, border: string, notification: string}}}
   */
  defaultTheme() {
    return {
      colors: {
        primary: '#1d8cd7',
        background: '#ffffff',
        card: '#ffffff',
        text: '#000000',
        border: '#cccccc',
        notification: '#ff0000',
      },
    };
  }
}
