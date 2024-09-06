import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';

interface IngredientListProps {
  ingredients: string[];
}

const IngredientList: React.FC<IngredientListProps> = ({ingredients}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const renderIngredientItem = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => (
    <View style={styles.ingredientItem}>
      <View style={styles.ingredientNumber}>
        <Text style={styles.ingredientNumberText}>{index + 1}</Text>
      </View>
      <Text style={styles.ingredientText}>{item}</Text>
    </View>
  );

  return (
    <View>
      {/* 点击展开/折叠部分 */}
      <TouchableOpacity style={styles.header} onPress={toggleExpanded}>
        <Icon name="list" type="entypo" />
        <Text style={styles.headerText}>Ingredients</Text>
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          type="entypo"
          color="#666"
        />
      </TouchableOpacity>

      {/* 如果展开则显示所有 Ingredients */}
      {isExpanded && (
        <FlatList
          data={ingredients}
          renderItem={renderIngredientItem}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={true} // 允许嵌套滚动
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  ingredientNumber: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  ingredientNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
});

export default IngredientList;
