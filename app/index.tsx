import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import Header from '@/components/header';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function TabOneScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#006AB6' }}>
      <Stack.Screen
        options={{
          header: () => <Header />,
        }}
      />
      <SafeAreaView style={{ flex: 1}}>
        <View style={styles.content}>
          <View style={styles.illustration}>
            <Image source={require('@/assets/images/113.png')} style={{width: 200, height: 150}} />
            <Text style={styles.temperature}>28°</Text>
            <Text style={styles.text}>Precipitation</Text>
            <Text style={styles.text}>Max: 31° Min: 25°</Text>
          </View>
          
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-between"
  },
  illustration: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
    gap: 5
  },
  temperature: {
    color: "#fff",
    fontSize: 30,
  },
  text: {
    color: "#fff",
  },
  
});