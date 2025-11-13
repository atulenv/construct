import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import { Theme } from '../../constants/theme';

const SOSScreen = () => {
  const [isSosActive, setIsSosActive] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const userLocation = { latitude: 37.78825, longitude: -122.4324 };
  const safeZoneLocation = { latitude: 37.78, longitude: -122.45 };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isSosActive && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    } else if (countdown === 0) {
      Alert.alert('Help is on the way!', 'Authorities have been notified and are en route to your location.');
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSosActive, countdown]);

  const handleSosPress = () => {
    setIsSosActive(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          ...userLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={userLocation} title="Your Location" pinColor="red" />
        <Marker coordinate={safeZoneLocation} title="Safe Zone" pinColor="green" />
        <Polyline
          coordinates={[userLocation, safeZoneLocation]}
          strokeColor={Theme.colors.primary}
          strokeWidth={3}
        />
      </MapView>
      {!isSosActive ? (
        <TouchableOpacity style={styles.sosButton} onPress={handleSosPress}>
          <Ionicons name="alert-circle" size={80} color="white" />
          <Text style={styles.sosButtonText}>CALL EMERGENCY</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.sosActiveContainer}>
          <Text style={styles.sosStatusText}>Alerting Authorities...</Text>
          <Text style={styles.countdownText}>{countdown}</Text>
          <Text style={styles.sosHelpText}>Help is on the way!</Text>
        </View>
      )}
      <View style={styles.emergencyContact}>
        <Text style={styles.emergencyContactTitle}>Emergency Contact</Text>
        <Text style={styles.emergencyContactName}>Jane Doe: 123-456-7890</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  map: {
    height: '60%',
  },
  sosButton: {
    position: 'absolute',
    top: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 200,
    height: 200,
    borderRadius: 100,
    ...Theme.shadows.lg,
  },
  sosButtonText: {
    color: 'white',
    fontFamily: Theme.font.family.sansBold,
    fontSize: Theme.font.size.lg,
    marginTop: 10,
  },
  sosActiveContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  sosStatusText: {
    fontSize: Theme.font.size.xl,
    fontFamily: Theme.font.family.sansBold,
    color: 'red',
  },
  countdownText: {
    fontSize: 60,
    fontFamily: Theme.font.family.sansBold,
    marginVertical: 20,
  },
  sosHelpText: {
    fontSize: Theme.font.size.lg,
    fontFamily: Theme.font.family.sans,
    color: Theme.colors.darkGray,
  },
  emergencyContact: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Theme.colors.lightGray,
    padding: 20,
    alignItems: 'center',
  },
  emergencyContactTitle: {
    fontSize: Theme.font.size.md,
    fontFamily: Theme.font.family.sansBold,
    marginBottom: 5,
  },
  emergencyContactName: {
    fontSize: Theme.font.size.md,
    fontFamily: Theme.font.family.sans,
  },
});

export default SOSScreen;