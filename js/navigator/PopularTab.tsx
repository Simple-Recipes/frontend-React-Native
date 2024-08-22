import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Image,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index';
import Toast from 'react-native-easy-toast';
import Constants from '../expand/dao/Constants';

const THEME_COLOR = '#a67';

// 定义类型
interface PopularTabProps {
  storeName: string;
  pageSize: number;
  popular: any;
  favoriteDao: any;
  onRefreshPopular: (
    storeName: string,
    url: string,
    pageSize: number,
    favoriteDao: any
  ) => void;
  onLoadMorePopular: (
    storeName: string,
    pageIndex: number,
    pageSize: number,
    items: any[],
    favoriteDao: any,
    callback: (error: string) => void
  ) => void;
}

const PopularTab: React.FC<PopularTabProps> = props => {
  const [page, setPage] = useState(1);
  const toastRef = useRef<typeof Toast>(null);
  let canLoadMore = false; // 控制是否可以加载更多

  const loadData = (type: 'refresh' | 'loadMore') => {
    const {
      storeName,
      pageSize,
      onRefreshPopular,
      onLoadMorePopular,
      popular,
      favoriteDao,
    } = props;
    const store = popular[storeName];
    const url = genFetchUrl(storeName, page, pageSize);

    if (type === 'loadMore') {
      onLoadMorePopular(
        storeName,
        ++store.pageIndex,
        pageSize,
        store.items,
        favoriteDao,
        error => {
          if (error) {
            toastRef.current?.show('没有更多了');
          }
        }
      );
    } else {
      onRefreshPopular(storeName, url, pageSize, favoriteDao);
    }
  };

  const genFetchUrl = (key: string, page: number, pageSize: number): string => {
    if (!key) {
      console.error('Key is undefined!');
      return ''; // 返回空字符串或者处理此情况
    }
    return `${Constants.recipes.getPopularByTag}?tag=${encodeURIComponent(key)}&page=${page}&pageSize=${pageSize}`;
  };

  useEffect(() => {
    if (page === 1 || !props.popular[props.storeName].items.length) {
      loadData('refresh');
    }
  }, [page]);

  const renderItem = ({item}: {item: any}) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.link}} style={styles.image} />
        <View style={styles.itemInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.likes}>点赞: {item.likes}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.popular[props.storeName].items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl
            title={'Loading'}
            titleColor={THEME_COLOR}
            colors={[THEME_COLOR]}
            refreshing={props.popular[props.storeName].isLoading}
            onRefresh={() => loadData('refresh')}
          />
        }
        onEndReached={() => {
          if (canLoadMore) {
            loadData('loadMore');
            canLoadMore = false;
          }
        }}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          canLoadMore = true;
        }}
        ListFooterComponent={() =>
          !props.popular[props.storeName].hideLoadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator size="large" color={THEME_COLOR} />
              <Text style={styles.footerText}>Loading more...</Text>
            </View>
          ) : (
            <View style={styles.footer}>
              <Text style={styles.footerText}>No more data</Text>
            </View>
          )
        }
      />
      <Toast ref={toastRef} position="center" />
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  popular: state.popular,
});

const mapDispatchToProps = (dispatch: any) => ({
  onRefreshPopular: (
    storeName: string,
    url: string,
    pageSize: number,
    favoriteDao: any
  ) =>
    dispatch(actions.onRefreshPopular(storeName, url, pageSize, favoriteDao)),
  onLoadMorePopular: (
    storeName: string,
    pageIndex: number,
    pageSize: number,
    items: any[],
    favoriteDao: any,
    callback: (error: string) => void
  ) =>
    dispatch(
      actions.onLoadMorePopular(
        storeName,
        pageIndex,
        pageSize,
        items,
        favoriteDao,
        callback
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  likes: {
    fontSize: 12,
    color: '#999',
  },
});
