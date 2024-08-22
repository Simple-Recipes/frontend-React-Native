interface ThemeState {
  theme: {
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
    };
  };
  customThemeViewVisible: boolean;
}

const initialState: ThemeState = {
  theme: {
    colors: {
      primary: '#000000',
      background: '#ffffff',
      card: '#f8f8f8',
      text: '#333333',
      border: '#cccccc',
      notification: '#ff0000',
    },
  },
  customThemeViewVisible: false,
};

const themeReducer = (state = initialState, action: any): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      return {...state, theme: action.theme};
    case 'TOGGLE_THEME_VIEW':
      return {...state, customThemeViewVisible: action.customThemeViewVisible};
    default:
      return state;
  }
};

export default themeReducer;
