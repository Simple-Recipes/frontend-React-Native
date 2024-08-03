import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const InputField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f3f4',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
});

export default InputField;
