import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, Button, StyleSheet} from 'react-native';
import NavigationUtil from '../util/NavigationUtil';

const HomePage = (props: any) => {
  const {navigation} = props;

  useEffect(() => {
    console.log('HomePage rendered'); // 添加日志
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View>
        <Text style={styles.title}>Home Page</Text>
        <Button
          title="Go to Profile"
          onPress={() => NavigationUtil.goPage({navigation}, 'ProfilePage')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomePage;
