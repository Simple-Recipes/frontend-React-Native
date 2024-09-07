import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker'; // Import image picker
import {useNavigation} from '@react-navigation/native';
import Storage from '../util/storage';
import InputField from '../common/InputField';
import Button from '../common/Button';
import Constants from '../expand/dao/Constants';
import {get, put} from '../expand/dao/HiNet';
import NavigationUtil from '../util/NavigationUtil';

interface UserProfile {
  username: string;
  email: string;
  avatar: string;
}

const ProfilePage = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<UserProfile>({
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
      const response = await get(Constants.user.profile)();
      if (response && response.code === 1) {
        const userData = response.data as unknown as UserProfile;
        userData.avatar =
          userData.avatar ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8KBogEsVJytTynCC0znYh07_aw_ylaOLd_g&usqp=CAU';
        setUser(userData);
      } else {
        setMsg('Failed to load user profile');
      }
    } catch (e) {
      setMsg('Failed to load user profile');
    }
  };

  const onUpdateProfile = async () => {
    try {
      const token = await Storage.getItem('jwt-token');
      await put(Constants.user.updateProfile)(user); // Update user profile
      setEditMode(false);
      setMsg('Profile updated successfully');
    } catch (e) {
      setMsg('Failed to update profile');
    }
  };

  const onLogout = () => {
    Storage.removeItem('jwt-token');
    NavigationUtil.resetToLogin({navigation});
  };

  const handleChooseAvatar = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('Image picker error: ', response.errorMessage);
          Alert.alert('Error', 'Failed to pick image');
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0].uri;

          if (selectedImage) {
            setUser({...user, avatar: selectedImage});
          }
        }
      }
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.headerButtons}>
          {editMode ? (
            <TouchableOpacity onPress={onUpdateProfile}>
              <Text style={styles.save}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setEditMode(true)}>
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={handleChooseAvatar}>
          <Image source={{uri: user.avatar}} style={styles.avatar} />
        </TouchableOpacity>
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
          </>
        ) : (
          <>
            <Text style={styles.text}>{user.username}</Text>
            <Text style={styles.text}>{user.email}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  save: {
    fontSize: 16,
    color: '#1d8cd7',
    marginRight: 16,
  },
  edit: {
    fontSize: 16,
    color: '#1d8cd7',
    marginRight: 16,
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
    textAlign: 'center',
  },
  msg: {
    fontSize: 14,
    color: 'red',
    marginTop: 12,
    textAlign: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#ff0000',
  },
});

export default ProfilePage;
