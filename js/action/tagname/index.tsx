// action/tagname/index.ts
import Types from '../types';
import TagNameDao, {FLAG_TAGNAME} from '../../expand/dao/TagNameDao';

/**
 * 加载标签名
 * @param flagKey
 * @returns {function(*)}
 */
export function onLoadTagName(flagKey: string) {
  return async (dispatch: any) => {
    try {
      const tagNames = await new TagNameDao(flagKey).fetch();
      dispatch({type: Types.TAGNAME_LOAD_SUCCESS, tagNames, flag: flagKey});
    } catch (e) {
      console.log(e);
    }
  };
}
