import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import NavigationUtil from '../util/NavigationUtil';
import Button from '../common/Button';
import InputField from '../common/InputField';
import Header from '../common/Header';

const ResetPasswordPage = (props: {navigation: any}) => {
  const {navigation} = props;
  const [newPassword, setNewPassword] = useState('');

  const onResetPassword = () => {
    // Add logic to handle password reset
    console.log('Reset password to', newPassword);
    NavigationUtil.goPage({navigation}, 'LoginPage');
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header
        title="Create a new password"
        onBackPress={() => navigation.goBack()}
      />
      <InputField
        placeholder="New password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button title="Continue" onPress={onResetPassword} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F6',
    padding: 20,
  },
});

export default ResetPasswordPage;
