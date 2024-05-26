import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import Header from '@/components/header';

export default function TabOneScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#006AB6' }}>
      <Stack.Screen
        options={{
          header: () => <Header />,
        }}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  illustration: {
    alignItems: "center",
  }
});