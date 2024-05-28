import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { CurrentWeatherResponse } from '@/assets/api/weatherAPI';

interface HeaderProps {
    city: string;
    current: CurrentWeatherResponse | null;
}

const Header: React.FC<HeaderProps> = ({ city, current }) => {
    const navigation = useNavigation();

    useEffect(() => {
        console.log(current);
    }, [current]);

    const getBackgroundColor = () => {
        if (current) {
            if (current.current.is_day === 0) {
                return current.current.cloud > 50 ? '#424242' : '#000D27';
            } else {
                return current.current.cloud > 50 ? '#949494' : '#0082E0';
            }
        }
        // Par défaut, retournez une couleur de fond
        return '#0082E0';
    };

    return (
        <SafeAreaView style={{ backgroundColor: getBackgroundColor() }}>
            <View style={styles.container}>
                <Text style={styles.title}>{city}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('search')}>
                    <AntDesign name="bars" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        height: 60,
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

export default Header;