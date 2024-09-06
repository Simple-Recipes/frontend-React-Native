// common/RecipeImage.tsx
import React from 'react';
import {Image, StyleSheet} from 'react-native';

interface RecipeImageProps {
  imageUrl: string;
}

const RecipeImage: React.FC<RecipeImageProps> = ({imageUrl}) => {
  return <Image source={{uri: imageUrl}} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
});

export default RecipeImage;
