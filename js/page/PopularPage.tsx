import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import SearchBar from '../common/SearchBar';
import PopularItem from '../common/PopularItem';
import DataStore, {FLAG_STORAGE} from '../expand/dao/DataStore'; //  DataStore
import Constants from '../expand/dao/Constants'; // API
import HiNet from '../expand/dao/HiNet';
import {useNavigation} from '@react-navigation/native';

// Define ProjectModel interface with the required "link" property
interface ProjectModel {
  id: number;
  title: string;
  likes: number;
  comments: number;
  createTime: string;
  link: string; // Add this to resolve the error
}

const tabNames = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const PopularPage: React.FC = () => {
  const [recipes, setRecipes] = useState<ProjectModel[]>([]); // 存储食谱数据
  const [currentTab, setCurrentTab] = useState(tabNames[0]); // 当前选中的标签
  const navigation = useNavigation(); // 导航 hook
  const dataStore = new DataStore(); // 实例化 DataStore

  // 使用 DataStore 来获取食谱数据
  const fetchRecipesByTag = async (
    tag: string,
    page: number = 1,
    pageSize: number = 10
  ) => {
    try {
      const url = Constants.recipes.getPopularByTag(tag, page, pageSize);
      const response = await HiNet.get(url)();

      console.log('Received response:', response); // 打印完整的响应

      // Safely access records or fallback to empty array
      const recipeData = response.data?.records || response.data || [];

      setRecipes(recipeData); // 更新状态，确保是 records 数组
    } catch (error) {
      console.error('Error fetching popular recipes by tag:', error);
    }
  };

  // 处理搜索请求
  const handleSearch = async (query: string) => {
    try {
      const url = Constants.recipes.search(query);
      const data = await dataStore.fetchData(url, FLAG_STORAGE.flag_popular); // 使用 DataStore 的 fetchData 方法进行搜索
      setRecipes(data.data); // 更新搜索到的食谱
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  // 当标签切换时调用 fetchRecipesByTag
  useEffect(() => {
    fetchRecipesByTag(currentTab);
  }, [currentTab]);

  // 渲染单个食谱项
  const renderPopularItem = ({item}: {item: ProjectModel}) => {
    console.log('Rendering item:', item); // 打印每个项目，检查是否传递成功
    return (
      <PopularItem
        projectModel={item}
        onSelect={() => navigation.navigate('RecipeDetails', {id: item.id})} // Ensure correct parameter passed to onSelect
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* 搜索栏 */}
      <SearchBar onSearch={handleSearch} />

      {/* 标签栏 */}
      <View style={styles.tabContainer}>
        {tabNames.map(tab => (
          <Text
            key={tab}
            style={[
              styles.tabItem,
              currentTab === tab && styles.tabItemSelected,
            ]}
            onPress={() => setCurrentTab(tab)}>
            {tab}
          </Text>
        ))}
      </View>

      {/* 食谱列表 */}
      <FlatList
        data={recipes} // Ensure correct data type (ProjectModel[])
        renderItem={renderPopularItem} // 确保 renderItem 函数中 item 的类型为 ProjectModel
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  tabItem: {
    fontSize: 16,
    color: '#333',
  },
  tabItemSelected: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});

export default PopularPage;
