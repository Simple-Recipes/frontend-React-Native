import {createStore, applyMiddleware, Middleware} from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from '../reducer';
import {createLogger} from 'redux-logger';

// 定义 logger 中间件
const logger = createLogger();

// 将中间件类型定义为 Middleware 数组
const middlewares: Middleware[] = [thunk, logger];

// 创建 store 并应用中间件
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
