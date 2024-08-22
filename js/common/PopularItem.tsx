import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface ProjectModel {
  id: number;
  title: string;
  likes: number;
  comments: number;
  createTime: string;
}

interface PopularItemProps {
  projectModel: ProjectModel;
  onSelect: (item: ProjectModel) => void;
}

const PopularItem: React.FC<PopularItemProps> = ({projectModel, onSelect}) => {
  const {title, likes, comments, createTime} = projectModel;

  return (
    <TouchableOpacity onPress={() => onSelect(projectModel)}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            Likes: {likes} | Comments: {comments}
          </Text>
          <Text style={styles.date}>
            Created on: {new Date(createTime).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
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
