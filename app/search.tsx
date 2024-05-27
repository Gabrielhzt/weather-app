import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WeatherApi from '@/assets/api/weatherAPI';

export default function Search() {
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState<{ id: number; name: string; country: string }[]>([]);

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
        console.log(results)
        Alert.alert('Search Complete', `City data for "${text}" retrieved.`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to search weather data.');
    }
  };

  const boxes = () => {
    return (
        <View style={styles.box}>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <View style={{gap: 5}}>
              <Text style={{color: "#fff", fontSize: 18}}>New York</Text>
              <Text style={{color: "#fff", fontSize: 13}}>10:30</Text>
            </View>
            <Text style={{color: "#fff", fontSize: 35}}>28°</Text>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={{color: "#fff", fontSize: 13}}>Sunny</Text>
            <View style={{flexDirection: "row", gap: 5}}>
              <Text style={{color: "#fff", fontSize: 13}}>28°</Text>
              <Text style={{color: "#fff", fontSize: 13}}>21°</Text>
            </View>
          </View>
        </View>
    )
  }

  return (
      <SafeAreaView style={{flex: 1, backgroundColor: "#000"}}>
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
              <View style={{paddingHorizontal: 10, gap: 20, flex: 1}}>
                <Text style={{color: "#fff", fontSize: 25}}>Result:</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                {searchResults.map((result) => (
                  <View key={result.id} style={{flexDirection: "row", alignItems: "center", marginBottom: 20, gap: 5}}>
                    <MaterialCommunityIcons name="map-marker" size={24} color="#fff" />
                    <Text style={styles.text}>{result.name}, {result.country}</Text>
                  </View>
                ))}
                </ScrollView>
              </View>
            ):(
              <View style={{paddingHorizontal: 10, gap: 20, flex: 1}}>
                <Text style={{color: "#fff", fontSize: 25}}>Weather Insights:</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {boxes()}
                  {boxes()}
                  {boxes()}
                  {boxes()}
                  {boxes()}
                  {boxes()}
                  {boxes()}
                  {boxes()}
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
    padding:13,
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
  }
});