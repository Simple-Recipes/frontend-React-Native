import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LoginDao from '../expand/dao/LoginDao';
import NavigationUtil from '../util/NavigationUtil';
import Button from '../common/Button';
import InputField from '../common/InputField';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  LoginPage: undefined;
  HomePage: undefined;
  ForgotPasswordPage: undefined;
  RegistrationPage: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoginPage'
>;

type LoginPageProps = {
  navigation: any;
};

const LoginPage: React.FC<LoginPageProps> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const onLogin = () => {
    if (username === '' || password === '') {
      setMsg('用户名或密码不能为空');
      return;
    }
    setMsg('');

    LoginDao.getInstance()
      .login(username, password)
      .then(res => {
        console.log('Login successful:', res); // 打印登录成功的响应
        NavigationUtil.goPage({}, 'HomePage'); // 使用导航工具类进行页面跳转
      })
      .catch(e => {
        const {msg} = e;
        setMsg(msg);
      });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
      </View>
      <InputField
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {msg ? <Text style={styles.error}>{msg}</Text> : null}
      <TouchableOpacity
        style={styles.link}
        onPress={() =>
          NavigationUtil.goPage({navigation}, 'ForgotPasswordPage')
        }>
        <Text style={styles.linkText}>Forgot password?</Text>
      </TouchableOpacity>
      <Button title="Log in" onPress={onLogin} />
      <TouchableOpacity
        style={styles.link}
        onPress={() => NavigationUtil.goPage({navigation}, 'RegistrationPage')}>
        <Text style={styles.linkTextCenter}>
          Don&apos;t have an account? Sign up
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    marginVertical: 10,
    alignItems: 'flex-start',
    paddingLeft: 4,
  },
  linkText: {
    color: '#647987',
    textDecorationLine: 'underline',
  },
  linkTextCenter: {
    color: '#647987',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginPage;
