
import React from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const SplashScreen = () => {
  const progress = new Animated.Value(0);
  const fadeOut = new Animated.Value(1);
  const router = useRouter();

  React.useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => router.push('/home'));
    });
  }, []);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View style={{ flex: 1, opacity: fadeOut }}>
      <LinearGradient
        colors={['#e6f7ff', '#e9ecef']}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>TS</Text>
        </View>
        <Text style={styles.title}>Welcome to Tourist Safety</Text>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progress, { width }]} />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#007bff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    fontFamily: 'Roboto',
  },
  progressBar: {
    width: '80%',
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
});

export default SplashScreen;
