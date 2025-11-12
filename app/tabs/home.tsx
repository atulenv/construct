import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Animated, Easing } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_DEFAULT } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Theme } from '../../constants/theme';

const HomeScreen = () => {
  const router = useRouter();
  const sosButtonScale = useState(new Animated.Value(1))[0];

  const userLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const riskZones = [
    { id: 1, coordinate: { latitude: 37.78, longitude: -122.44 }, risk: 'High' },
    { id: 2, coordinate: { latitude: 37.79, longitude: -122.42 }, risk: 'Medium' },
    { id: 3, coordinate: { latitude: 37.77, longitude: -122.45 }, risk: 'Low' },
  ];

  const nearbySafetyZones = [
    { id: 1, name: 'City Hospital', type: 'Hospital', distance: '2.5 km' },
    { id: 2, name: 'Police Station Central', type: 'Police', distance: '1.1 km' },
    { id: 3, name: 'Tourist Info Center', type: 'Help', distance: '0.8 km' },
  ];

  const safetyAlerts = [
    { id: 1, message: 'Heavy rain advisory in effect until 6 PM.', type: 'Weather' },
    { id: 2, message: 'Protest expected near downtown area today.', type: 'Unrest' },
  ];

  const weatherData = {
    temperature: '22°C',
    condition: 'Partly Cloudy',
    icon: 'cloudy-outline',
  };

  const getRiskColor = (risk) => {
    if (risk === 'High') return Theme.colors.riskHigh;
    if (risk === 'Medium') return Theme.colors.riskMedium;
    return Theme.colors.riskLow;
  };

  const handleSos = () => {
    router.push('/screens/SOSScreen');
  };

  const animateSosButton = (toValue) => {
    Animated.timing(sosButtonScale, {
      toValue,
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.weatherContainer}>
          <Ionicons name={weatherData.icon} size={24} color={Theme.colors.darkGray} />
          <Text style={styles.weatherText}>{weatherData.temperature}, {weatherData.condition}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.alertsBar}>
          {safetyAlerts.map(alert => (
            <View key={alert.id} style={styles.alertItem}>
              <Ionicons name="warning-outline" size={16} color={Theme.colors.warning} />
              <Text style={styles.alertText}>{alert.message}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={userLocation}
      >
        <Marker coordinate={userLocation} pinColor={Theme.colors.primary} />
        {riskZones.map((zone) => (
          <Circle
            key={zone.id}
            center={zone.coordinate}
            radius={500}
            fillColor={getRiskColor(zone.risk)}
            strokeWidth={0}
          />
        ))}
      </MapView>

      <ScrollView style={styles.safetyZonesContainer}>
        <Text style={styles.sectionTitle}>Nearby Safety Zones</Text>
        {nearbySafetyZones.map(zone => (
          <View key={zone.id} style={styles.safetyZoneItem}>
            <Ionicons name="location-outline" size={20} color={Theme.colors.darkGray} />
            <Text style={styles.safetyZoneName}>{zone.name}</Text>
            <Text style={styles.safetyZoneDistance}>{zone.distance}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.sosButtonContainer}
        onPress={handleSos}
        onPressIn={() => animateSosButton(1.1)}
        onPressOut={() => animateSosButton(1)}
      >
        <Animated.View style={[styles.sosButton, { transform: [{ scale: sosButtonScale }] }]}>
          <Ionicons name="alert-circle-outline" size={40} color={Theme.colors.white} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  header: {
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.mediumGray,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  weatherText: {
    marginLeft: Theme.spacing.xs,
    fontSize: Theme.font.size.sm,
    fontFamily: Theme.font.family.sans,
    color: Theme.colors.darkGray,
  },
  alertsBar: {
    flexDirection: 'row',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.sm,
    borderRadius: Theme.radius.md,
    marginRight: Theme.spacing.sm,
    ...Theme.shadows.sm,
  },
  alertText: {
    marginLeft: Theme.spacing.xs,
    fontSize: Theme.font.size.sm,
    fontFamily: Theme.font.family.sans,
    color: Theme.colors.darkGray,
  },
  map: {
    flex: 1,
    minHeight: 300, // Ensure map has a minimum height
  },
  safetyZonesContainer: {
    maxHeight: 200, // Limit height for scrollable list
    padding: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.mediumGray,
  },
  sectionTitle: {
    fontSize: Theme.font.size.lg,
    fontFamily: Theme.font.family.sansBold,
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.md,
  },
  safetyZoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.lightGray,
  },
  safetyZoneName: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
    fontSize: Theme.font.size.md,
    fontFamily: Theme.font.family.sans,
  },
  safetyZoneDistance: {
    fontSize: Theme.font.size.sm,
    fontFamily: Theme.font.family.sans,
    color: Theme.colors.darkGray,
  },
  sosButtonContainer: {
    position: 'absolute',
    bottom: Theme.spacing.lg,
    alignSelf: 'center',
  },
  sosButton: {
    backgroundColor: Theme.colors.danger, // Red for SOS
    width: 70,
    height: 70,
    borderRadius: Theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.lg,
  },
});

export default HomeScreen;