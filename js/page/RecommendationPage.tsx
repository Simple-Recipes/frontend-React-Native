import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SearchBar from '../common/SearchBar'; // Existing SearchBar component
import PopularItem from '../common/PopularItem'; // Existing PopularItem component
import Constants from '../expand/dao/Constants'; // Existing API constants
import HiNet from '../expand/dao/HiNet'; // Use HiNet for network requests
import Button from '../common/Button'; // Custom common Button component
import {useNavigation} from '@react-navigation/native';

// Define ProjectModel interface for recipes
interface ProjectModel {
  id: number;
  title: string;
  likes: number;
  comments: number;
  createTime: string;
  link: string; // Assuming link is optional
}

const RecommendationPage: React.FC = () => {
  const [recipes, setRecipes] = useState<ProjectModel[]>([]); // Store recommended recipes
  const [searchQuery, setSearchQuery] = useState(''); // Store search query
  const [ingredients, setIngredients] = useState<string[]>([
    'tomato',
    'cheese',
  ]); // Default ingredients with placeholder
  const [includeAllIngredients, setIncludeAllIngredients] = useState(true); // Include all ingredients flag
  const [maxTime, setMaxTime] = useState(30); // Default max time (30 minutes)
  const [preference, setPreference] = useState('High Rating'); // Default preference type
  const navigation = useNavigation(); // Navigation hook

  // Fetch recommendations from the backend using HiNet.post
  const fetchRecommendations = async () => {
    try {
      const url = Constants.recommendations.post; // Define the POST request API URL
      console.log('Post URL:', url); // Log the URL for debugging

      // Prepare the request body as per the RecommendationRequestDTO structure
      const requestBody = {
        ingredients,
        includeAllIngredients,
        maxTime,
        preference,
      };

      // Call HiNet.post and immediately invoke it with requestBody
      const response = await HiNet.post(url)(requestBody); // Make sure the second invocation happens immediately
      console.log('Received response:', response); // Log the full response for debugging

      // If there is response data, update the recommended recipes
      const recipeData = response?.data || [];
      setRecipes(recipeData);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      Alert.alert('Error', 'Failed to fetch recommendations');
    }
  };

  // Add a new ingredient field (default to "Include")
  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  // Render a single recipe item
  const renderRecipeItem = ({item}: {item: ProjectModel}) => {
    return (
      <PopularItem
        projectModel={item}
        onSelect={() => navigation.navigate('RecipeDetails', {id: item.id})} // Ensure correct type for onSelect
      />
    );
  };

  // Render preference selection buttons
  const renderPreferenceButton = (label: string) => (
    <TouchableOpacity
      style={[
        styles.preferenceButton,
        preference === label && styles.selectedPreferenceButton,
      ]}
      onPress={() => setPreference(label)}>
      <Text
        style={[
          styles.preferenceButtonText,
          preference === label && styles.selectedPreferenceButtonText,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <SearchBar
          onSearch={fetchRecommendations} // When search is triggered, fetch recommendations
          value={searchQuery}
          onChangeText={(query: string) => setSearchQuery(query)} // Fix the type of query
        />
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Ingredients</Text>
        {ingredients.map((ingredient, index) => (
          <TextInput
            key={index}
            style={styles.ingredientInput}
            placeholder={ingredient || 'tomato'}
            value={ingredient}
            onChangeText={text => {
              const updatedIngredients = [...ingredients];
              updatedIngredients[index] = text;
              setIngredients(updatedIngredients);
            }}
          />
        ))}

        <TouchableOpacity onPress={addIngredient} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add More Ingredients</Text>
        </TouchableOpacity>

        {/* Include All Ingredients Checkbox */}
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Include All Ingredients</Text>
          <TouchableOpacity
            style={styles.checkboxButton}
            onPress={() => setIncludeAllIngredients(!includeAllIngredients)}>
            <Text style={styles.checkboxButtonText}>
              {includeAllIngredients ? 'Yes' : 'No'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Max Time Filter */}
        <View style={styles.timeFilterContainer}>
          <Text style={styles.filterTitle}>Max Time</Text>
          <View style={styles.timeControlContainer}>
            <TouchableOpacity
              onPress={() => setMaxTime(maxTime - 5 > 0 ? maxTime - 5 : 0)}
              style={styles.timeButton}>
              <Text style={styles.timeButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.timeValue}>{maxTime} min</Text>
            <TouchableOpacity
              onPress={() => setMaxTime(maxTime + 5)}
              style={styles.timeButton}>
              <Text style={styles.timeButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Preference Type */}
        <View style={styles.preferenceContainer}>
          <Text style={styles.filterTitle}>Preference Type</Text>
          {renderPreferenceButton('High Rating')}
          {renderPreferenceButton('Low Calories')}
          {renderPreferenceButton('High Protein')}
        </View>

        {/* Confirm Button */}
        <Button title="Confirm Recommendation" onPress={fetchRecommendations} />
      </View>

      {/* Recipe List */}
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false} // Disable internal scroll so that the entire page scrolls
      />
    </ScrollView>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchBarContainer: {
    marginBottom: 20,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredientInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  checkboxButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  checkboxButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timeFilterContainer: {
    marginBottom: 20,
  },
  timeControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
  },
  timeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  timeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  preferenceContainer: {
    marginBottom: 20,
  },
  preferenceButton: {
    backgroundColor: '#ddd',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  selectedPreferenceButton: {
    backgroundColor: '#007bff',
  },
  preferenceButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  selectedPreferenceButtonText: {
    color: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default RecommendationPage;
