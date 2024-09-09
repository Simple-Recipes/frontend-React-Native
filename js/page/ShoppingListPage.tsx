// ShoppingListPage.tsx
import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Alert, Text} from 'react-native';
import ShoppingListItem from '../common/ShoppingListItem'; // Component to show each shopping list item
import HiNet from '../expand/dao/HiNet';
import Constants from '../expand/dao/Constants';

const ShoppingListPage: React.FC = () => {
  const [shoppingList, setShoppingList] = useState<any[]>([]);

  // Fetch shopping list items from API
  const fetchShoppingList = async () => {
    try {
      const response = await HiNet.get(Constants.shoppingList.get)(); // Replace with the correct API endpoint
      setShoppingList(response.data);
    } catch (error) {
      console.error('Error fetching shopping list:', error);
    }
  };

  useEffect(() => {
    fetchShoppingList();
  }, []);

  const handleCheckboxToggle = async (itemId: number) => {
    try {
      await HiNet.post(Constants.shoppingList.toggle)(itemId); // API call to toggle checkbox
      fetchShoppingList(); // Refresh data
    } catch (error) {
      Alert.alert('Error', 'Failed to update shopping list');
    }
  };

  const renderItem = ({item}: {item: any}) => (
    <ShoppingListItem
      item={item}
      onToggle={() => handleCheckboxToggle(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <FlatList
        data={shoppingList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ShoppingListPage;
