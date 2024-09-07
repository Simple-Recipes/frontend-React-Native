// InventoryPage.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import InventoryItem from '../common/InventoryItem'; // Component to show each inventory item
import Button from '../common/Button';
import {useNavigation} from '@react-navigation/native';
import HiNet from '../expand/dao/HiNet';
import Constants from '../expand/dao/Constants';
import TabIcon from '../common/TabIcon'; // For top-right Shopping List icon

const InventoryPage: React.FC = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const navigation = useNavigation();

  // Fetch inventory items from API
  const fetchInventory = async () => {
    try {
      const response = await HiNet.get(Constants.inventory.get)(); // Replace with the correct API endpoint
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const renderItem = ({item}: {item: any}) => (
    <InventoryItem
      item={item}
      onIncrease={() => handleIncrease(item.id)}
      onDecrease={() => handleDecrease(item.id)}
    />
  );

  // Increase item quantity
  const handleIncrease = async (itemId: number) => {
    try {
      await HiNet.post(Constants.inventory.update)(itemId, 'increase'); // API call to increase item
      fetchInventory(); // Refresh data
    } catch (error) {
      Alert.alert('Error', 'Failed to update inventory');
    }
  };

  // Decrease item quantity
  const handleDecrease = async (itemId: number) => {
    try {
      await HiNet.post(Constants.inventory.update)(itemId, 'decrease'); // API call to decrease item
      fetchInventory(); // Refresh data
    } catch (error) {
      Alert.alert('Error', 'Failed to update inventory');
    }
  };

  return (
    <View style={styles.container}>
      {/* Shopping List Icon */}
      <TouchableOpacity
        style={styles.shoppingIcon}
        onPress={() => navigation.navigate('ShoppingListPage')}>
        <TabIcon name="shoppingcart" type="AntDesign" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Inventory</Text>
      <FlatList
        data={inventory}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Button title="Add items" onPress={() => Alert.alert('Add items')} />
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
  shoppingIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});

export default InventoryPage;
