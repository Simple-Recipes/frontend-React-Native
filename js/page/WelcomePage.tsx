import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {NavigationProp} from '@react-navigation/native';
import NavigationUtil from '../util/NavigationUtil';
import SplashScreen from 'react-native-splash-screen';
import {getBoarding} from '../util/BoardingUtil';
import {onThemeInit} from '../action/theme/index';

interface WelcomePageProps {
  navigation: NavigationProp<any>;
  onThemeInit: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({navigation, onThemeInit}) => {
  useEffect(() => {
    const initialize = async () => {
      try {
        await onThemeInit(); // 这里需要等待 onThemeInit 完成
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
        console.warn(<Text>{`Error hiding splash screen: ${e}`}</Text>);
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

const mapDispatchToProps = (dispatch: any) => ({
  onThemeInit: () => dispatch(onThemeInit()),
});

export default connect(null, mapDispatchToProps)(WelcomePage);
