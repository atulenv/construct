import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Theme } from '../constants/theme';
import * as Progress from 'react-native-progress';

const SplashScreen = () => {
  const router = useRouter();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2500, // Match splash screen duration
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    // Simulate loading and navigate to the permissions screen
    const timer = setTimeout(() => {
      router.replace('/screens/Permissions');
    }, 3000); // 3-second splash screen

    return () => clearTimeout(timer);
  }, [router, pulseAnim, progressAnim]);

  return (
    <LinearGradient
      colors={[Theme.colors.lightBlue, Theme.colors.lightGray]} // Soft Blue to Light Gray gradient
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.Text style={[styles.logo, { transform: [{ scale: pulseAnim }] }]}>
          🛡️
        </Animated.Text>
        <Text style={styles.title}>Welcome to Tourist Safety</Text>
      </View>
      <View style={styles.footer}>
        <Progress.Bar
          progress={progressAnim}
          width={200}
          color={Theme.colors.primary}
          unfilledColor={Theme.colors.mediumGray}
          borderColor="transparent"
          height={5}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: Theme.spacing.md,
  },
  title: {
    fontSize: Theme.font.size['2xl'],
    fontFamily: Theme.font.family.sansBold,
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.sm,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Theme.spacing.sm,
    fontSize: Theme.font.size.sm,
    fontFamily: Theme.font.family.sans,
    color: Theme.colors.darkGray,
  },
});

export default SplashScreen;