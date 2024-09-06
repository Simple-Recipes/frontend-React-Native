import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

interface BottomBarProps {
  likes: number;
  comments: number;
}

const BottomBar: React.FC<BottomBarProps> = ({likes, comments}) => {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.bottomBarButton}>
        <Icon name="heart" type="feather" color="red" />
        <Text>{likes}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomBarButton}>
        <Icon name="message-circle" type="feather" color="gray" />
        <Text>{comments}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomBarButton}>
        <Icon name="bookmark" type="feather" color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  bottomBarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});

export default BottomBar;
