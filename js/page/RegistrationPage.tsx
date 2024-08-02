import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';

const RegistrationPage = (props: any) => {
  const {navigation} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [helpUrl, setHelpUrl] = useState('');

  const onRegister = async () => {
    if (username === '' || password === '' || email === '') {
      setMsg('用户名、密码或邮箱不能为空');
      return;
    }
    setHelpUrl('');
    setMsg('');
    try {
      const response = await fetch('http://localhost:8085/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });
      const res = await response.json();
      if (res.code === 1) {
        // 注册成功
        NavigationUtil.resetToHomePage({navigation});
      } else {
        setMsg(res.msg);
      }
    } catch (e) {
      setMsg(msg);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>注册</Text>
        <TouchableOpacity
          onPress={() => NavigationUtil.goPage({navigation}, 'LoginPage')}>
          <Text style={styles.rightTitle}>登录</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      <View style={styles.content}>
        <View style={styles.line} />
        <TextInput
          style={styles.input}
          placeholder="请输入用户名"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="请输入密码"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="请输入邮箱"
          value={email}
          onChangeText={setEmail}
        />
        {msg ? <Text style={styles.error}>{msg}</Text> : null}
        {helpUrl ? <Text style={styles.helpUrl}>{helpUrl}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={onRegister}>
          <Text style={styles.buttonText}>注册</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F1F5F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rightTitle: {
    fontSize: 16,
    color: '#1d8cd7',
  },
  line: {
    height: 0.5,
    backgroundColor: '#D0D4D4',
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  input: {
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
});

export default RegistrationPage;
