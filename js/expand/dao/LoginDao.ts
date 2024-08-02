import {saveBoarding} from '../../util/BoardingUtil';
import Constants from './Constants';

export default class LoginDao {
  private static instance: LoginDao;
  private constructor() {}

  public static getInstance(): LoginDao {
    if (!LoginDao.instance) {
      LoginDao.instance = new LoginDao();
    }

    return LoginDao.instance;
  }

  login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const api = Constants.user.loginWithPassword;

      const loginData = {
        username,
        password,
      };

      // 直接使用fetch发送请求，避免发送Authorization头部
      fetch(Constants.baseUrl + api, {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          console.log('Response status:', res.status); // 打印响应状态
          return res.json();
        })
        .then((res: any) => {
          console.log('Parsed response:', res); // 打印解析后的响应
          const {code, msg, data} = res;
          if (code === 1 && data && data.token) {
            saveBoarding(data.token); // 存储token
            resolve(data || msg);
          } else {
            reject(res);
          }
        })
        .catch(e => {
          console.error('Fetch error:', e); // 打印fetch错误
          reject({code: -1, msg: '哎呀出错了'});
        });
    });
  }
}
