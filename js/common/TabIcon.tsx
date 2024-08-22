import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

interface TabIconProps {
  name: string;
  type: 'MaterialIcons' | 'Ionicons' | 'Entypo';
  size: number;
  color: string;
}

const TabIcon: React.FC<TabIconProps> = ({name, type, size, color}) => {
  switch (type) {
    case 'MaterialIcons':
      return <MaterialIcons name={name} size={size} color={color} />;
    case 'Ionicons':
      return <Ionicons name={name} size={size} color={color} />;
    case 'Entypo':
      return <Entypo name={name} size={size} color={color} />;
    default:
      return null;
  }
};

export default TabIcon;
