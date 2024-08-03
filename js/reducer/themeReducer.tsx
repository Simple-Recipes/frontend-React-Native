import {THEME_INIT} from '../action/actions';

const initialState = {
  theme: 'light', // Default theme
};

export default function themeReducer(state = initialState, action: any) {
  switch (action.type) {
    case THEME_INIT:
      // Initialize theme logic
      return {...state, theme: 'dark'}; // Example: set theme to 'dark'
    default:
      return state;
  }
}
