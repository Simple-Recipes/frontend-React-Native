import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import Button from '../common/Button';
import InputField from '../common/InputField';
import Header from '../common/Header';

const ForgotPasswordPage = (props: {navigation: any}) => {
  const {navigation} = props;
  const [email, setEmail] = useState('');

  const onSendLink = () => {
    // Add logic to handle sending the reset password link
    console.log('Send reset password link to', email);
    NavigationUtil.goPage({navigation}, 'ResetPasswordPage');
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header
        title="Recover Your Account"
        onBackPress={() => navigation.goBack()}
      />
      <Text style={styles.instruction}>
        Enter your email address and we'll send you a link to reset your
        password.
      </Text>
      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Send Link" onPress={onSendLink} />
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
  instruction: {
    color: '#111517',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default ForgotPasswordPage;
