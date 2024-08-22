import Types from '../../action/types';

// 定义 PopularState 和 PopularAction 接口
interface PopularState {
  [key: string]: {
    items?: any[];
    projectModels?: any[];
    isLoading?: boolean;
    hideLoadingMore?: boolean;
    pageIndex?: number;
  };
}

interface PopularAction {
  type: string;
  storeName?: string;
  items?: any[];
  projectModels?: any[];
  pageIndex?: number;
  pageSize?: number; // 添加 pageSize 属性
}

const defaultState: PopularState = {};

export default function onAction(
  state: PopularState = defaultState,
  action: PopularAction
): PopularState {
  switch (action.type) {
    case Types.POPULAR_REFRESH:
      return {
        ...state,
        [action.storeName!]: {
          ...(state[action.storeName!] || {
            // 确保初始化 storeName 的对象
            items: [],
            projectModels: [],
            isLoading: false,
            hideLoadingMore: true,
            pageIndex: 1,
          }),
          isLoading: true,
          hideLoadingMore: true,
        },
      };
    case Types.POPULAR_REFRESH_SUCCESS:
      return {
        ...state,
        [action.storeName!]: {
          ...state[action.storeName!],
          items: action.items || [],
          projectModels: action.projectModels || [],
          isLoading: false,
          hideLoadingMore:
            (action.projectModels || []).length < (action.items || []).length,
          pageIndex: action.pageIndex || 1,
        },
      };

    case Types.POPULAR_REFRESH_FAIL:
      return {
        ...state,
        [action.storeName!]: {
          ...state[action.storeName!],
          isLoading: false,
        },
      };
    case Types.POPULAR_LOAD_MORE_SUCCESS:
      return {
        ...state,
        [action.storeName!]: {
          ...state[action.storeName!],
          projectModels: [
            ...(state[action.storeName!]?.projectModels || []),
            ...(action.projectModels || []),
          ],
          hideLoadingMore:
            (action.projectModels || []).length < (action.pageSize || 0),
          pageIndex: action.pageIndex || 1,
        },
      };

    case Types.POPULAR_LOAD_MORE_FAIL:
      return {
        ...state,
        [action.storeName!]: {
          ...state[action.storeName!],
          hideLoadingMore: true,
          pageIndex: (action.pageIndex || 1) - 1,
        },
      };

    default:
      return state;
  }
}
