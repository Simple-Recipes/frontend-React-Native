import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {useRoute} from '@react-navigation/native';
import hinet from '../expand/dao/HiNet';
import Constants from '../expand/dao/Constants';
import IngredientList from '../common/Details/IngredientList';
import StepList from '../common/Details/StepList';
import BottomBar from '../common/Details/BottomBar';
import RecipeImage from '../common/Details/RecipeImage';

const RecipeDetailsPage: React.FC = () => {
  const route = useRoute();
  const {id} = route.params as {id: string};
  const [recipe, setRecipe] = useState<any>(null);

  const fetchRecipeDetails = async (id: string) => {
    try {
      const url = Constants.recipes.getDetails(id);
      const response = await hinet.get(url)();
      setRecipe(response.data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  useEffect(() => {
    fetchRecipeDetails(id);
  }, [id]);

  if (!recipe) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderRecipeContent = () => (
    <>
      {/* 图片区域 */}
      <RecipeImage imageUrl={recipe.link} />

      {/* 食谱标题和分享按钮 */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share" type="entypo" color="#000" />
        </TouchableOpacity>
      </View>

      {/* 食材部分 */}
      <Card containerStyle={styles.card}>
        <IngredientList ingredients={recipe.ingredients} />
      </Card>

      {/* 步骤部分 */}
      <Card containerStyle={styles.card}>
        <Card.Title>Directions</Card.Title>
        <StepList steps={recipe.directions} />
      </Card>

      {/* 底部按钮栏 */}
      <BottomBar likes={recipe.likes} comments={recipe.comments} />
    </>
  );

  return (
    <FlatList
      data={[{key: 'recipeDetails'}]} // 使用FlatList渲染整个页面内容
      renderItem={renderRecipeContent}
      keyExtractor={(item, index) => index.toString()}
      nestedScrollEnabled={true} // 启用嵌套滚动
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    backgroundColor: '#F8F8F8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  shareButton: {
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 50,
  },
  card: {
    borderRadius: 10,
    elevation: 2,
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

export default RecipeDetailsPage;
