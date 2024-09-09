import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';

interface StepListProps {
  steps: string[];
}

const StepList: React.FC<StepListProps> = ({steps}) => {
  const renderStepItem = ({item, index}: {item: string; index: number}) => (
    <View style={styles.stepContainer}>
      {/* 编号 */}
      <View style={styles.stepNumberContainer}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>{index + 1}</Text>
        </View>
      </View>
      {/* 步骤内容 */}
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>Step {index + 1}</Text>
        <Text style={styles.stepDescription}>{item}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={steps}
      renderItem={renderStepItem}
      keyExtractor={(item, index) => index.toString()}
      nestedScrollEnabled={true} // 启用嵌套滚动
    />
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  stepNumberContainer: {
    marginRight: 10,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default StepList;
