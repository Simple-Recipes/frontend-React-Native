import Types from '../types';
import ThemeDao from '../../expand/dao/ThemeDao';

/**
 * 主题变更
 * @param theme
 * @returns {{type: string, theme: *}}
 */
export function onThemeChange(theme: unknown) {
  return {type: Types.THEME_CHANGE, theme: theme};
}

/**
 * 初始化主题
 * @returns {Function}
 */
export function onThemeInit() {
  return (dispatch: (arg0: {type: string; theme: unknown}) => void) => {
    new ThemeDao().getTheme().then(data => {
      dispatch(onThemeChange(data));
    });
  };
}

/**
 * 显示自定义主题浮层
 * @param show
 * @returns {{type: *, customThemeViewVisible: *}}
 */
export function onShowCustomThemeView(show: any) {
  return {type: Types.SHOW_THEME_VIEW, customThemeViewVisible: show};
}

/**
 * 主题配色
 */
const theme = {
  colors: {
    primary: '#1d8cd7', // 与登录页面的按钮颜色统一
    background: '#ffffff',
    card: '#ffffff',
    text: '#000000',
    border: '#cccccc',
    notification: '#ff0000',
  },
};

export default theme;
