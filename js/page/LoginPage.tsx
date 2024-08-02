import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import LoginDao from '../expand/dao/LoginDao';
import NavigationUtil from '../navigator/NavigationUtil';

const LoginPage = (props: any) => {
  const {navigation} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [helpUrl, setHelpUrl] = useState('');

  const onLogin = () => {
    if (username === '' || password === '') {
      setMsg('用户名或密码不能为空');
      return;
    }
    setHelpUrl('');
    setMsg('');

    console.log('navigation object:', navigation); // 检查 navigation 对象

    LoginDao.getInstance()
      .login(username, password)
      .then(res => {
        const {code} = res;
        if (code === 1) {
          console.log('LoginPage: Login successful, navigating to HomePage');
          // 假设code为1时表示成功
          NavigationUtil.resetToHomePage({navigation});
        } else {
          setMsg(res.msg);
        }
      })
      .catch(e => {
        const {code, data: {helpUrl = ''} = {}, msg} = e;
        setMsg(msg);
        setHelpUrl(helpUrl);
      });
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {msg ? <Text style={styles.error}>{msg}</Text> : null}
      {helpUrl ? <Text style={styles.helpUrl}>{helpUrl}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => NavigationUtil.goPage({navigation}, 'RegistrationPage')}>
        <Text style={styles.signUp}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
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
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f3f4',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  helpUrl: {
    color: 'blue',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1d8cd7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUp: {
    color: '#647987',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
