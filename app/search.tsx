import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WeatherApi, { CurrentWeatherResponse } from '@/assets/api/weatherAPI';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Définir les types des paramètres de navigation
export type RootStackParamList = {
  index: { cityName: string };
  // Ajoutez d'autres routes ici si nécessaire
};

// Déclaration globale pour les paramètres de navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Typage de la navigation
type NavigationProp = StackNavigationProp<RootStackParamList, 'index'>;

export default function Search() {
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState<{ id: number; name: string; country: string }[]>([]);
  const [insights, setInsights] = useState<CurrentWeatherResponse[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const cities = ['New York', 'Paris', 'Tokyo', 'London', 'Los Angeles', 'Shanghai', 'Bangkok'];

    const fetchWeatherData = async () => {
      try {
        const promises = cities.map(async (city) => {
          const response = await WeatherApi.getCurrentWeather(city);
          return response;
        });

        const results = await Promise.all(promises);
        setInsights(results);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const onChangeText = (inputText: string) => {
    setText(inputText);
  };

  const handleSearch = async () => {
    try {
      const results = await WeatherApi.search(text);

      if (results.length === 0) {
        Alert.alert('No Results', `No city data found for "${text}".`);
      } else {
        setSearchResults(results);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to search weather data.');
    }
  };

  const handleSelect = (cityName: string) => {
    navigation.navigate('index', { cityName });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <View style={styles.allsearch}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Enter city name"
            placeholderTextColor="#C7C7C7"
          />
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <FontAwesome name="search" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        {searchResults.length > 0 ? (
          <View style={{ paddingHorizontal: 10, gap: 20, flex: 1 }}>
            <Text style={{ color: "#fff", fontSize: 25 }}>Result:</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {searchResults.map((result) => (
                <TouchableOpacity onPress={() => handleSelect(result.name)} key={result.id}>
                  <View key={result.id} style={{ flexDirection: "row", alignItems: "center", marginBottom: 20, gap: 5 }}>
                    <MaterialCommunityIcons name="map-marker" size={24} color="#fff" />
                    <Text style={styles.text}>{result.name}, {result.country}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : (
          <View style={{ paddingHorizontal: 10, gap: 20, flex: 1 }}>
            <Text style={{ color: "#fff", fontSize: 25 }}>Weather Insights:</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {insights.map((props) => (
                <TouchableOpacity onPress={() => handleSelect(props.location.name)} key={props.location.name}>
                  <LinearGradient
                    colors={props.current.is_day ? (props.current.cloud > 50 ? ['#949494', '#39ACFF'] : ['#0082E0', '#65BEFF']) : (props.current.cloud > 50 ? ['#424242', '#000D27'] : ['#000D27', '#02266C'])}
                    style={styles.box}
                  >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <View style={{ gap: 5 }}>
                        <Text style={{ color: "#fff", fontSize: 18 }}>{props.location.name}</Text>
                        <Text style={{ color: "#fff", fontSize: 13 }}>{props.location.localtime.split(' ')[1]}</Text>
                      </View>
                      <Text style={{ color: "#fff", fontSize: 35 }}>{props.current.temp_c}°</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={{ color: "#fff", fontSize: 13 }}>{props.current.condition.text}</Text>
                      <View style={{ flexDirection: "row", gap: 5 }}>
                        <Text style={{ color: "#fff", fontSize: 13 }}>{props.location.localtime.split(' ')[0]}</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff"
  },
  allsearch: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    marginBottom: 40,
    height: 50
  },
  input: {
    height: 50,
    color: "#fff",
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 10,
    flex: 1
  },
  button: {
    backgroundColor: "#fff",
    padding: 13,
    paddingTop: 10,
    borderRadius: 30
  },
  box: {
    backgroundColor: "#006AB6",
    borderRadius: 20,
    padding: 15,
    justifyContent: "space-between",
    height: 110,
    marginBottom: 20
  },
  gradient: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
