import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import Storage from '../util/storage';
import Button from '../common/Button';
import InputField from '../common/InputField';
import Header from '../common/Header';

const ProfileScreen = ({}) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    avatar: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = await Storage.getItem('jwt-token');
      const response = await fetch('http://localhost:8085/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (e) {
      setMsg('Failed to load user profile');
    }
  };

  const onUpdateProfile = async () => {
    try {
      const token = await Storage.getItem('jwt-token');
      await fetch('http://localhost:8085/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      setEditMode(false);
      setMsg('Profile updated successfully');
    } catch (e) {
      setMsg('Failed to update profile');
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header title="Profile" onBackPress={undefined} />
      <View style={styles.content}>
        <Image source={{uri: user.avatar}} style={styles.avatar} />
        {editMode ? (
          <>
            <InputField
              placeholder="Username"
              value={user.username}
              onChangeText={(text: any) => setUser({...user, username: text})}
            />
            <InputField
              placeholder="Email"
              value={user.email}
              onChangeText={(text: any) => setUser({...user, email: text})}
            />
            <Button title="Save" onPress={onUpdateProfile} />
          </>
        ) : (
          <>
            <Text style={styles.text}>Username: {user.username}</Text>
            <Text style={styles.text}>Email: {user.email}</Text>
          </>
        )}
        <Text style={styles.msg}>{msg}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F1F5F6',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  msg: {
    fontSize: 14,
    color: 'red',
    marginTop: 12,
    textAlign: 'center',
  },
});

export default ProfileScreen;
