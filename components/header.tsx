import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const Header = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ backgroundColor: '#006AB6'}}>
            <View style={styles.container}>
                <Text style={styles.title}>New York</Text>
                <TouchableOpacity onPress={() => navigation.navigate('modal')}>
                    <AntDesign name="bars" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        height: 60,
        padding: 10,
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

export default Header;