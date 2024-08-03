import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Header = ({title, onBackPress}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress}>
        <Text style={styles.back}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  back: {
    color: '#000',
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

export default Header;
