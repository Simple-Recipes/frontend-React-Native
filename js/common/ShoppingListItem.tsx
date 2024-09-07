// common/ShoppingListItem.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const ShoppingListItem = ({item, onToggle}: any) => {
  return (
    <View style={styles.itemContainer}>
      <CheckBox value={item.checked} onValueChange={onToggle} />
      <Text style={styles.itemTitle}>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  itemTitle: {
    fontSize: 16,
  },
});

export default ShoppingListItem;
