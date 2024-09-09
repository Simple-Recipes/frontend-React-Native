import {combineReducers} from 'redux';
import themeReducer from './theme/themeReducer';

// 定义根reducer
const rootReducer = combineReducers({
  theme: themeReducer,
});

// 导出根reducer类型
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
