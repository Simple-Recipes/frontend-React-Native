import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Constants from '../expand/dao/Constants';
import NavigationBar from '../common/NavigationBar';
import Toast from 'react-native-easy-toast';
import FavoriteDao from '../expand/dao/FavoriteDao';
import Icon from 'react-native-vector-icons/Feather';

const THEME_COLOR = '#a67';

const Tab = createMaterialTopTabNavigator();

interface ThemeType {
  themeColor: string;
  styles: {
    navBar: object;
  };
}

interface TagNameType {
  name: string;
}

interface PopularPageProps {
  tagNames: TagNameType[];
  theme: ThemeType;
  onLoadTagName: (flag: string) => void;
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

interface ApiResponse {
  data: any[];
  code: number;
  msg: string;
}

const PopularPage: React.FC<PopularPageProps> = props => {
  const tabNames = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  // 搜索图标的按钮
  const renderRightButton = () => (
    <TouchableOpacity
      onPress={() => {
        /* 跳转到搜索页面 */
      }}>
      <Icon name="search" size={24} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, marginTop: 30}}>
      <NavigationBar rightButton={renderRightButton()} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabStyle,
          tabBarLabelStyle: styles.labelStyle,
          tabBarIndicatorStyle: styles.indicatorStyle,
          tabBarScrollEnabled: true,
        }}>
        {tabNames.map((name, index) => (
          <Tab.Screen
            key={index}
            name={name}
            component={PopularTabWrapper}
            initialParams={{tabLabel: name}}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

interface PopularTabProps {
  route: {params: {tabLabel: string}};
  popular: any;
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
  storeName: string;
  pageSize: number;
  favoriteDao: any;
}

const UnconnectedPopularTabPage: React.FC<PopularTabProps> = ({
  route,
  popular,
  onRefreshPopular,
  onLoadMorePopular,
  storeName,
  pageSize,
  favoriteDao,
}) => {
  const [page, setPage] = React.useState(1);
  const toastRef = React.useRef<typeof Toast>(null);
  let canLoadMore = false;

  const loadData = (type: 'refresh' | 'loadMore') => {
    const store = popular?.[storeName] || {
      items: [],
      isLoading: false,
      hideLoadingMore: true,
    };
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
    return Constants.recipes.getPopularByTag(key, page, pageSize);
  };

  React.useEffect(() => {
    const store = popular?.[storeName] || {
      items: [],
      isLoading: false,
      hideLoadingMore: true,
    };
    if (page === 1 || !store.items.length) {
      loadData('refresh');
    }
  }, [page]);

  const renderItem = ({item}: {item: any}) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.link}} style={styles.image} />
        <View style={styles.itemInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.likes}>点赞: {item.likes}</Text>{' '}
        </View>
      </View>
    );
  };

  const store = popular?.[storeName] || {
    items: [],
    isLoading: false,
    hideLoadingMore: true,
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={store.items}
        renderItem={renderItem}
        keyExtractor={item => '' + item.id}
        refreshControl={
          <RefreshControl
            title={'Loading'}
            titleColor={THEME_COLOR}
            colors={[THEME_COLOR]}
            refreshing={store.isLoading}
            onRefresh={() => loadData('refresh')}
            tintColor={THEME_COLOR}
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
          !store.hideLoadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator size="large" color={THEME_COLOR} />
              <Text style={styles.footerText}>Loading more...</Text>{' '}
            </View>
          ) : (
            <View style={styles.footer}>
              <Text style={styles.footerText}>No more data</Text>{' '}
            </View>
          )
        }
      />
      <Toast ref={toastRef} position="center" />
    </View>
  );
};

const ConnectedPopularTabPage = connect(
  (state: any) => ({
    popular: state.popular,
  }),
  (dispatch: any) => ({
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
  })
)(UnconnectedPopularTabPage);

const PopularTabWrapper = (props: any) => {
  const {tabLabel} = props.route.params;
  const storeName = tabLabel;
  const pageSize = 10;
  const favoriteDao = new FavoriteDao('popular');

  return (
    <ConnectedPopularTabPage
      {...props}
      storeName={storeName}
      pageSize={pageSize}
      favoriteDao={favoriteDao}
    />
  );
};

const mapStateToProps = (state: any) => ({
  popular: state.popular || {},
  tagNames: state.tagNames || [],
  theme: state.theme || [],
});

const mapDispatchToProps = (dispatch: any) => ({
  onLoadTagName: (flag: string) => dispatch(actions.onLoadTagName(flag)),
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
  tabStyle: {
    padding: 0,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white',
  },
  labelStyle: {
    fontSize: 13,
    margin: 0,
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

export default connect(mapStateToProps, mapDispatchToProps)(PopularPage);
