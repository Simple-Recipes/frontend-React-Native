import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

const WeeklyMealRecommendations: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weekly Themes</Text>

      <Text style={styles.categoryTitle}>Fitness</Text>

      {/* 推荐的餐食选项 */}
      <View style={styles.mealOptionContainer}>
        <View style={styles.mealOption}>
          <Image
            source={require('../assert/image/FoodGreen.jpg')}
            style={styles.mealImage}
          />
          <Text>Lean and green</Text>
          <Text>4 recipes</Text>
        </View>
        <View style={styles.mealOption}>
          <Image
            source={require('../assert/image/HighProtein1.jpg')}
            style={styles.mealImage}
          />
          <Text>High protein</Text>
          <Text>5 recipes</Text>
        </View>
        <View style={styles.mealOption}>
          <Image
            source={require('../assert/image/QuickAndEasy.jpg')}
            style={styles.mealImage}
          />
          <Text> Quick and easy</Text>
          <Text>6 recipes</Text>
        </View>
      </View>

      {/* 生成计划和添加购物清单按钮 */}
      <TouchableOpacity style={styles.generateButton}>
        <Text style={styles.generateButtonText}>Generate Meal Plan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add to Shopping List</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  mealOptionContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  mealOption: {
    marginBottom: 20,
  },
  mealImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  generateButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WeeklyMealRecommendations;
