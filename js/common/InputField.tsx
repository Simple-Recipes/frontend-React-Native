import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';

interface InputFieldProps extends TextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  ...rest
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      {...rest}
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
