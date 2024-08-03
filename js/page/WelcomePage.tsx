import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import NavigationUtil from '../util/NavigationUtil';
import SplashScreen from 'react-native-splash-screen';
import {getBoarding} from '../util/BoardingUtil';
import {onThemeInit} from '../action/actions';

const WelcomePage = ({navigation, onThemeInit}) => {
  useEffect(() => {
    const initialize = async () => {
      try {
        onThemeInit();
        await new Promise(resolve => setTimeout(resolve, 200)); // 模拟一个异步任务
        if (SplashScreen && SplashScreen.hide) {
          SplashScreen.hide();
        } else {
          console.warn('SplashScreen is not available');
        }
        const token = await getBoarding();
        if (token) {
          NavigationUtil.resetToHomePage({navigation});
        } else {
          NavigationUtil.login({navigation});
        }
      } catch (e) {
        console.warn('Error hiding splash screen: ', e);
      }
    };

    initialize();

    return () => {
      // 清除定时器或其他清理任务
    };
  }, [navigation, onThemeInit]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Recipe Manager App</Text>
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
  },
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d8cd7',
  },
});

const mapDispatchToProps = (dispatch: (arg0: {type: string}) => any) => ({
  onThemeInit: () => dispatch(onThemeInit()),
});

export default connect(null, mapDispatchToProps)(WelcomePage);
