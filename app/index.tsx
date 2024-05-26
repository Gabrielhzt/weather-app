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
          <View style={styles.allbox}>
            <View style={styles.box}>
              <View style={styles.info}>
                <Entypo name="water" size={18} color="#fff" />
                <Text style={styles.textinfo}>6%</Text>
              </View>
              <View style={styles.info}>
                <FontAwesome6 name="temperature-three-quarters" size={18} color="#fff" />
                <Text style={styles.textinfo}>90%</Text>
              </View>
              <View style={styles.info}>
                <Feather name="wind" size={24} color="#fff" />
                <Text style={styles.textinfo}>19 km/h</Text>
              </View>
            </View>
            <View style={styles.box2}>
              <Text style={styles.description}>7-day Forecast</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
                  <View style={styles.day}>
                    <Text style={styles.text}>28°C</Text>
                    <Image source={require('@/assets/images/113.png')} style={{width: 40, height: 60}} />
                    <Text style={styles.text}>15:00</Text>
                  </View>
                  <View style={styles.day}>
                    <Text style={styles.text}>28°C</Text>
                    <Image source={require('@/assets/images/113.png')} style={{width: 60, height: 60}} />
                    <Text style={styles.text}>15:00</Text>
                  </View>
                  <View style={styles.day}>
                    <Text style={styles.text}>28°C</Text>
                    <Image source={require('@/assets/images/113.png')} style={{width: 60, height: 60}} />
                    <Text style={styles.text}>15:00</Text>
                  </View>
                  <View style={styles.day}>
                    <Text style={styles.text}>28°C</Text>
                    <Image source={require('@/assets/images/113.png')} style={{width: 60, height: 60}} />
                    <Text style={styles.text}>15:00</Text>
                  </View>
                  <View style={styles.day}>
                    <Text style={styles.text}>28°C</Text>
                    <Image source={require('@/assets/images/113.png')} style={{width: 60, height: 60}} />
                    <Text style={styles.text}>15:00</Text>
                  </View>
                  <View style={styles.day}>
                    <Text style={styles.text}>28°C</Text>
                    <Image source={require('@/assets/images/113.png')} style={{width: 60, height: 60}} />
                    <Text style={styles.text}>15:00</Text>
                  </View>
                  <View style={styles.day}>
                    <Text style={styles.text}>28°C</Text>
                    <Image source={require('@/assets/images/113.png')} style={{width: 60, height: 60}} />
                    <Text style={styles.text}>15:00</Text>
                  </View>
                  <View style={{width: 20}}></View>
              </ScrollView>
            </View>
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
  allbox: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
    justifyContent: "flex-end"
  },
  box: {
    backgroundColor: "rgba(0, 16, 38, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  box2: {
    backgroundColor: "rgba(0, 16, 38, 0.5)",
    paddingVertical: 20,
    borderRadius: 20,
    height: 200,
    gap: 20
  },
  info: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  textinfo: {
    color: "#fff",
    fontSize: 16,
  },
  description:{
    color: "#fff",
    paddingHorizontal: 20,
  },
  day: {
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 20
  }
});