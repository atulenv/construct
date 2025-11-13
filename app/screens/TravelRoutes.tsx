import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Theme } from '../../constants/theme';

const TravelRoutesScreen = () => {
  const origin = { latitude: 37.78825, longitude: -122.4324 };
  const destination = { latitude: 37.7749, longitude: -122.4194 };

  const safeRoute = [
    { latitude: 37.78825, longitude: -122.4324 },
    { latitude: 37.783, longitude: -122.43 },
    { latitude: 37.78, longitude: -122.425 },
    { latitude: 37.7749, longitude: -122.4194 },
  ];

  const riskyRoute = [
    { latitude: 37.78825, longitude: -122.4324 },
    { latitude: 37.789, longitude: -122.435 },
    { latitude: 37.786, longitude: -122.43 },
    { latitude: 37.7749, longitude: -122.4194 },
  ];

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{ latitude: 37.781, longitude: -122.428, latitudeDelta: 0.03, longitudeDelta: 0.03 }}>
        <Marker coordinate={origin} pinColor={Theme.colors.primary} />
        <Marker coordinate={destination} pinColor={Theme.colors.riskLow} />
        <Polyline coordinates={safeRoute} strokeColor={Theme.colors.riskLow} strokeWidth={5} />
        <Polyline coordinates={riskyRoute} strokeColor={Theme.colors.riskHigh} strokeWidth={3} lineDashPattern={[6, 4]} />
      </MapView>

      <ScrollView style={styles.panel} contentContainerStyle={{ padding: Theme.spacing.md }}>
        <Text style={styles.title}>Route Overview</Text>

        <View style={styles.row}>
          <Ionicons name="shield-checkmark-outline" size={20} color={Theme.colors.primary} />
          <Text style={styles.rowText}>Recommended (Safer) Route — 22 mins</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="warning-outline" size={20} color={Theme.colors.riskHigh} />
          <Text style={styles.rowText}>Alternate (Faster) Route — 16 mins (Passes 2 high-risk zones)</Text>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Start Navigation</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.white },
  map: { height: '55%' },
  panel: { flex: 1, borderTopWidth: 1, borderTopColor: Theme.colors.lightGray },
  title: { fontSize: Theme.font.size.lg, fontFamily: Theme.font.family.sansBold, color: Theme.colors.primary, marginBottom: Theme.spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: Theme.spacing.sm },
  rowText: { marginLeft: Theme.spacing.sm, color: Theme.colors.darkGray, fontFamily: Theme.font.family.sans },
  actionButton: { marginTop: Theme.spacing.md, backgroundColor: Theme.colors.primary, padding: Theme.spacing.md, borderRadius: Theme.radius.md, alignItems: 'center' },
  actionButtonText: { color: Theme.colors.white, fontFamily: Theme.font.family.sansBold },
});

export default TravelRoutesScreen;
