import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useNavigation} from '@react-navigation/native';

const WeeklyMealPlanScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const navigation = useNavigation();

  const onDayPress = (day: {dateString: React.SetStateAction<string>}) => {
    setSelectedDay(day.dateString);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weekly Meal Plan</Text>

      {/* 日历部分 */}
      <Calendar
        current={'2023-09-07'}
        minDate={'2023-01-01'}
        maxDate={'2025-12-31'}
        onDayPress={onDayPress}
        markedDates={{
          [selectedDay]: {selected: true, selectedColor: '#00adf5'},
        }}
        theme={{
          selectedDayBackgroundColor: '#00adf5',
          arrowColor: '#00adf5',
          textDayFontWeight: '500',
        }}
      />

      {/* 菜单选择部分 */}
      <View style={styles.mealContainer}>
        <Text style={styles.selectTitle}>Select recipes for</Text>
        <View style={styles.mealButtons}>
          <TouchableOpacity style={styles.mealButton}>
            <Text style={styles.mealButtonText}>Breakfast</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mealButton}>
            <Text style={styles.mealButtonText}>Lunch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mealButton}>
            <Text style={styles.mealButtonText}>Dinner</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 开始规划按钮 */}
      <TouchableOpacity
        style={styles.startPlanningButton}
        onPress={() => navigation.navigate('WeeklyMealRecommendations')}>
        <Text style={styles.startPlanningButtonText}>Start Planning</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  mealContainer: {
    marginTop: 20,
  },
  selectTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  mealButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  mealButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  mealButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startPlanningButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  startPlanningButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WeeklyMealPlanScreen;
