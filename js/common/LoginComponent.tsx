import React from 'react';
import {
  Button,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TextInputProps,
  GestureResponderEvent,
} from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  placeholder?: string;
  shortLine?: boolean;
  secure?: boolean;
  onChangeText: (text: string) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  shortLine = false,
  secure = false,
  onChangeText,
  ...rest
}) => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.row}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={secure}
          autoCapitalize="none"
          style={styles.input}
          onChangeText={onChangeText}
          {...rest}
        />
      </View>
      <View
        style={{
          height: 0.5,
          backgroundColor: '#D0D4D4',
          marginLeft: shortLine ? 20 : 0,
        }}
      />
    </View>
  );
};

interface ConfirmButtonProps {
  title: string;
  onClick: (event: GestureResponderEvent) => void;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  title,
  onClick,
}) => {
  return (
    <TouchableOpacity style={styles.confirmLayout} onPress={onClick}>
      <Text style={styles.confirmTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

interface TipsProps {
  msg: string;
  helpUrl?: string;
}

export const Tips: React.FC<TipsProps> = ({msg, helpUrl}) => {
  return (
    <View style={styles.tipsLayout}>
      <Text style={styles.tips}>{msg}</Text>
      {!!helpUrl && (
        <Button
          title="查看帮助"
          onPress={() => {
            Linking.openURL(helpUrl);
          }}
        />
      )}
    </View>
  );
};

interface NavBarProps {
  title: string;
  rightTitle?: string;
  onRightClick?: (event: GestureResponderEvent) => void;
}

export const NavBar: React.FC<NavBarProps> = ({
  title,
  rightTitle,
  onRightClick,
}) => {
  return (
    <View style={styles.navBar}>
      <View />
      <View style={styles.titleLayout}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {rightTitle && (
        <TouchableOpacity onPress={onRightClick}>
          <Text style={styles.button}>{rightTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  inputLabel: {
    marginLeft: 15,
    marginTop: 18,
    marginBottom: 18,
    fontSize: 16,
    width: 90,
  },
  input: {
    flex: 1,
    marginRight: 15,
  },
  confirmLayout: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#2196F3',
    margin: 20,
    marginTop: 30,
    borderRadius: 5,
  },
  confirmTitle: {
    fontSize: 20,
    color: 'white',
  },
  tipsLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tips: {
    fontSize: 14,
    color: 'red',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  titleLayout: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  button: {
    color: '#007AFF',
    paddingRight: 15,
    fontSize: 16,
  },
});
