import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import HiNet from '../expand/dao/HiNet';
import Constants from '../expand/dao/Constants';
import Button from '../common/Button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // 使用react-native-vector-icons

const InventoryPage: React.FC = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [exampleItems, setExampleItems] = useState([
    {
      id: 0,
      itemName: 'Example 1',
      quantity: 1,
      unit: 'kg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 1,
      itemName: 'Example 2',
      quantity: 2,
      unit: 'lb',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // Fetch inventory items
  const fetchInventory = async () => {
    try {
      const response = await HiNet.get(Constants.inventory.getAll)();
      if (!response?.data || response.data.length === 0) {
        Alert.alert('Your inventory is empty. Here are some example items.');
        setInventory(exampleItems);
      } else {
        setInventory(response.data);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDelete = async (itemId: number) => {
    if (itemId < 2) {
      Alert.alert('You cannot delete example items.');
      return;
    }
    try {
      console.log('Attempting to delete item with id:', itemId);

      // 将 itemId 转换为字符串作为查询参数传递给 remove 函数
      const response = await HiNet.remove(Constants.inventory.delete)({
        inventoryId: itemId,
      });

      if (response.code === 1) {
        Alert.alert('Item deleted successfully');
        fetchInventory(); // 刷新库存列表
      } else {
        Alert.alert('Error', 'Failed to delete inventory item');
      }
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      Alert.alert('Error', 'Failed to delete inventory item');
    }
  };

  // Update item (Open update modal)
  const handleUpdate = (item: any) => {
    setSelectedItem(item);
    setModalVisible(true); // Open update modal
  };

  const renderRightActions = (item: any) => (
    <View style={styles.swipeActions}>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleUpdate(item)}>
        <MaterialIcons name="edit" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item}: {item: any}) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <View style={styles.card}>
        <Text style={styles.itemName}>Name: {item.itemName}</Text>
        <Text style={styles.itemDetails}>
          Quantity: {item.quantity} {item.unit}
        </Text>
        <Text style={styles.itemDetails}>
          Updated At: {new Date(item.updatedAt).toLocaleString()}
        </Text>
      </View>
    </Swipeable>
  );

  // Save or update item in the modal
  const handleSaveUpdate = async () => {
    const currentTime = new Date();
    try {
      if (selectedItem && !selectedItem.id) {
        // Add new item
        const newItem = {
          ...selectedItem,
          createdAt: currentTime,
          updatedAt: currentTime,
        };
        const response = await HiNet.post(Constants.inventory.add)(newItem);
        if (response.code === 1) {
          Alert.alert('Item added successfully');
        } else {
          Alert.alert('Error', 'Failed to add inventory item');
        }
      } else {
        // Update existing item
        const updatedItem = {
          ...selectedItem,
          updatedAt: currentTime, // Set updatedAt to current time
        };
        const response = await HiNet.put(Constants.inventory.update)(
          updatedItem
        );
        if (response.code === 1) {
          Alert.alert('Item updated successfully');
        } else {
          Alert.alert('Error', 'Failed to update inventory item');
        }
      }
      setModalVisible(false);
      fetchInventory(); // Refresh the inventory list after update
    } catch (error) {
      console.error('Error saving/updating inventory item:', error);
    }
  };

  // Handle adding a new item
  const handleAddItem = () => {
    setSelectedItem({
      itemName: '',
      quantity: 0,
      unit: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setModalVisible(true); // Show modal for adding a new item
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory</Text>
      {inventory.length === 0 ? (
        <Text style={styles.emptyText}>
          Your inventory is empty. Here are some example items.
        </Text>
      ) : (
        <FlatList
          data={inventory}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}

      {/* Add Item Button */}
      <Button title="Add items" onPress={handleAddItem} />

      {/* Update Item Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={selectedItem?.itemName}
              onChangeText={text =>
                setSelectedItem({...selectedItem, itemName: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              keyboardType="numeric"
              value={selectedItem?.quantity.toString()}
              onChangeText={text =>
                setSelectedItem({
                  ...selectedItem,
                  quantity: parseInt(text),
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Unit"
              value={selectedItem?.unit}
              onChangeText={text =>
                setSelectedItem({...selectedItem, unit: text})
              }
            />
            <Button title="Save" onPress={handleSaveUpdate} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
  },
  itemDetails: {
    fontSize: 16,
    color: '#555',
  },
  swipeActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});

export default InventoryPage;
function Long(itemId: number): any {
  throw new Error('Function not implemented.');
}
