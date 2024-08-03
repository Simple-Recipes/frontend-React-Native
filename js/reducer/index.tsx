import {combineReducers} from 'redux';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  // Add other reducers here
});

export default rootReducer;
