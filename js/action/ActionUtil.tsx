// action/ActionUtil.ts
export function handleData(
  type: string,
  dispatch: any,
  storeName: string,
  data: any,
  pageSize: number,
  favoriteDao: any
) {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }
  dispatch({
    type,
    projectModels: fixItems.slice(0, pageSize), // 第一次要加载的数据
    storeName,
    items: fixItems,
    pageIndex: 1,
  });
}

export function _projectModels(
  showItems: any[],
  favoriteDao: any,
  callback: (projectModels: any[]) => void
) {
  let keys: string | any[] = [];
  try {
    favoriteDao.getFavoriteKeys().then((result: never[]) => {
      keys = result || [];
      const projectModels = showItems.map(item => {
        return {
          isFavorite: keys.includes(item.id.toString()),
          item,
        };
      });
      if (typeof callback === 'function') {
        callback(projectModels);
      }
    });
  } catch (e) {
    console.log(e);
    callback(showItems);
  }
}
