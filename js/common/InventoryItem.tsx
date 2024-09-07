import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const InventoryItem = ({item, onIncrease, onDecrease}: any) => {
  return (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemSubtitle}>
          {item.quantity} {item.unit}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onDecrease} style={styles.button}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={onIncrease} style={styles.button}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InventoryItem;
