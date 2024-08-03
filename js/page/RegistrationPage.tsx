import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NavigationUtil from '../util/NavigationUtil';
import Button from '../common/Button';
import InputField from '../common/InputField';

const RegistrationPage = (props: {navigation: any}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const onRegister = async () => {
    if (username === '' || password === '' || email === '') {
      setMsg('用户名、密码或邮箱不能为空');
      return;
    }
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
        NavigationUtil.resetToHomePage({navigator});
      } else {
        setMsg(res.msg);
      }
    } catch (e) {
      setMsg('注册失败，请重试');
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign up</Text>
      </View>
      <InputField
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {msg ? <Text style={styles.error}>{msg}</Text> : null}
      <Button title="Register" onPress={onRegister} />
      <Text style={styles.footerText}>
        By continuing, you agree to our Terms of Use and acknowledge that you
        have read our Privacy Policy.
      </Text>
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
  footerText: {
    color: '#647987',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 16,
  },
});

export default RegistrationPage;
