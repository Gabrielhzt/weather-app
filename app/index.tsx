import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import Header from '@/components/header';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import WeatherApi, { CurrentWeatherResponse, ForecastDay } from '@/assets/api/weatherAPI';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

type RouteParams = {
  cityName?: string;
};

export default function TabOneScreen() {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [current, setCurrent] = useState<CurrentWeatherResponse | null>(null);
  const route = useRoute();
  const { cityName } = (route.params as RouteParams) || {};
  const city = cityName || 'Miami';

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await WeatherApi.getForecast(city);
        const formattedForecast: ForecastDay[] = response.map((forecastItem: any) => ({
          date: forecastItem.date,
          day: {
            maxtemp_c: forecastItem.maxtemp_c,
            mintemp_c: forecastItem.mintemp_c,
            daily_chance_of_rain: forecastItem.daily_chance_of_rain,
            maxwind_kph: forecastItem.maxwind_kph,
            condition: {
              text: forecastItem.condition_text,
              icon: forecastItem.condition_icon
            }
          },
          astro: {
            sunset: forecastItem.sunset
          }
        }));
        setForecast(formattedForecast);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    const fetchWeatherData = async () => {
      try {
        const response = await WeatherApi.getCurrentWeather(city);
        setCurrent(response);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchForecast();
    fetchWeatherData();
  }, [city]);

  function getDayOfWeek(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    const dayOfWeek: string = new Intl.DateTimeFormat('en-US', options).format(date);
    return dayOfWeek.substring(0, 3);
  }

  return (
    <LinearGradient
      colors={current && current.current.is_day === 0 
        ? (current.current.cloud > 50 ? ['#424242', '#000D27'] : ['#000D27', '#002F8B']) 
        : (current && current.current.cloud > 50 ? ['#949494', '#39ACFF'] : ['#0082E0', '#65BEFF'])}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            header: () => <Header city={city} current={current} />,
          }}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.content}>
            {forecast && forecast.length > 0 ? (
              <>
                <View style={styles.illustration}>
                  {current && current.current.is_day === 0 ? (
                    current.current.cloud > 50 ? (
                      <Image source={require('@/assets/images/rain.png')} style={{ width: 140, height: 130 }} />
                    ) : (
                      <Image source={require('@/assets/images/moon.png')} style={{ width: 200, height: 140 }} />
                    )
                  ) : (
                    current && current.current.cloud > 50 ? (
                      <Image source={require('@/assets/images/rain.png')} style={{ width: 140, height: 150 }} />
                    ) : (
                      <Image source={require('@/assets/images/sun.png')} style={{ width: 180, height: 150 }} />
                    )
                  )}
                  <Text style={styles.temperature}>{current?.current.temp_c}°</Text>
                  <Text style={styles.text}>{forecast[0].day.condition.text}</Text>
                  <Text style={styles.text}>Max: {forecast[0].day.maxtemp_c}° Min: {forecast[0].day.mintemp_c}°</Text>
                </View>
                <View style={styles.allbox}>
                  <View style={styles.box}>
                    <View style={styles.info}>
                      <Entypo name="water" size={14} color="#fff" />
                      <Text style={styles.textinfo}>{forecast[0].day.daily_chance_of_rain}%</Text>
                    </View>
                    <View style={styles.info}>
                      <Feather name="sunset" size={18} color="#fff" />
                      <Text style={styles.textinfo}>{forecast[0].astro.sunset}</Text>
                    </View>
                    <View style={styles.info}>
                      <Feather name="wind" size={18} color="#fff" />
                      <Text style={styles.textinfo}>{forecast[0].day.maxwind_kph} km/h</Text>
                    </View>
                  </View>
                  <View style={styles.box2}>
                    <Text style={styles.description}>5-day Forecast</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
                      {forecast.map((day, index) => (
                        <View style={styles.day} key={index}>
                          <Text style={styles.text}>{day.day.maxtemp_c}°C</Text>
                          {forecast[0].day.daily_chance_of_rain < 65 ? (
                            <Image source={require('@/assets/images/sun.png')} style={{ width: 40, height: 60 }} />
                          ) : (
                            <Image source={require('@/assets/images/rain.png')} style={{ width: 40, height: 60 }} />
                          )}
                          <Text style={styles.text}>{getDayOfWeek(day.date)} {day.date.substring(8)}</Text>
                        </View>
                      ))}
                      <View style={{ width: 20 }}></View>
                    </ScrollView>
                  </View>
                </View>
              </>
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        </SafeAreaView>
      </View>
    </LinearGradient>
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
    fontSize: 14,
  },
  description: {
    color: "#fff",
    paddingHorizontal: 20,
  },
  day: {
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20
  }
});
