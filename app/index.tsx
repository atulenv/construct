import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { Theme } from '../constants/theme';

const SplashScreen = () => {
  const router = useRouter();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [progress, setProgress] = useState(0);

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

    // Progress bar animation (numeric state)
    let start: number | null = null;
    const duration = 2500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min(1, elapsed / duration);
      setProgress(pct);
      if (elapsed < duration) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);

    // Simulate loading and navigate to the permissions screen
    const timer = setTimeout(() => {
      router.replace('/screens/Permissions');
    }, 3000); // 3-second splash screen

    return () => clearTimeout(timer);
  }, [router, pulseAnim]);

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
          progress={progress}
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