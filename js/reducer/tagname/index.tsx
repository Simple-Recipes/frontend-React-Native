// reducer/tagname/index.ts
import Types from '../../action/types';
import {FLAG_TAGNAME} from '../../expand/dao/TagNameDao';

const defaultState = {
  tagNames: [],
};

export default function onAction(state = defaultState, action: any) {
  switch (action.type) {
    case Types.TAGNAME_LOAD_SUCCESS:
      return {
        ...state,
        tagNames: action.tagNames,
      };
    default:
      return state;
  }
}
