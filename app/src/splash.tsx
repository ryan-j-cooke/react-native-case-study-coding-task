import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Easing, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import i18n from './locales/i18n';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
	textShadow: {
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
	},
    backgroundImage: {
        width: width,
        height: height,
        resizeMode: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    subtext: {
        fontSize: 20,
        color: 'white',
        marginTop: 5,
    },
});

SplashScreen.hideAsync();

const Splash = ({ onAnimationEnd }: { onAnimationEnd: () => void }) => {
    const opacityMainText = useSharedValue(0);
    const opacitySubText = useSharedValue(0);
    const translateY = useSharedValue(50);
    const fadeAnim = useRef(new Animated.Value(1)).current; // For fade-out

    const animatedMainTextStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityMainText.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    const animatedSubTextStyle = useAnimatedStyle(() => {
        return {
            opacity: opacitySubText.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    const { t } = useTranslation();

    useEffect(() => {
        translateY.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.exp) });

        opacityMainText.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });

        opacitySubText.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp), delay: 500 });

        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                onAnimationEnd();
            });
        }, 2000);
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>

            <ImageBackground source={require('../../assets/bg.jpg')} style={styles.backgroundImage}>

                <Animated.View style={animatedMainTextStyle}>

                    <Text style={[ styles.text, styles.textShadow ]}>
						
						{t('app-title')}
						
					</Text>

                </Animated.View>

                <Animated.View style={animatedSubTextStyle}>

                    <Text style={[ styles.subtext, styles.textShadow ]}>
						
						by Ryan Cooke
						
					</Text>

                </Animated.View>

            </ImageBackground>

        </Animated.View>
    );
};

export default Splash;