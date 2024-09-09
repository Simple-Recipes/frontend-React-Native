import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

interface ProjectModel {
  id: number;
  title: string;
  likes: number;
  comments: number;
  link: string; // 这里是图片地址
}

interface PopularItemProps {
  projectModel: ProjectModel;
  onSelect: (item: ProjectModel) => void;
}

const PopularItem: React.FC<PopularItemProps> = ({projectModel, onSelect}) => {
  const {title, likes, comments, link} = projectModel;

  return (
    <TouchableOpacity onPress={() => onSelect(projectModel)}>
      <View style={styles.container}>
        {/* 渲染图片 */}
        <Image source={{uri: link}} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            Likes: {likes} | Comments: {comments}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 水平方向布局
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 100, // 设置图片宽度
    height: 100, // 设置图片高度
    borderRadius: 8,
    marginRight: 10, // 图片和文本的间距
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default PopularItem;
