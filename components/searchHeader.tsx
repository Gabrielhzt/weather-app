import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const SearchHeader = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ backgroundColor: '#000'}}>
            <View style={styles.container}>
                <Text style={styles.title}>Search</Text>
                <TouchableOpacity onPress={() => navigation.navigate('index' as never)}>
                    <MaterialIcons name="keyboard-arrow-down" size={40} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        height: 80,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        color: "#fff"
    },
    title: {
        fontSize: 28,
        color: "#fff"
    }
});

export default SearchHeader;