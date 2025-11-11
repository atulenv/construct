import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

import {
  SAFE_SPOTS,
  SafeSpot,
} from "../src/lib/safety-data";

let MapView: any = null;
let Marker: any = null;


if (Platform.OS !== 'web') {
  import("react-native-maps").then((maps) => {
    MapView = maps.default;
    Marker = maps.Marker;
  });
}

type Coordinate = { latitude: number; longitude: number };
type RegionType = { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number };

const EMERGENCY_NUMBER = "112";
const TRUSTED_CONTACT_NUMBER = "+911234567890";

const DEFAULT_REGION: RegionType = {
  latitude: 28.6139,
  longitude: 77.209,
  latitudeDelta: 0.04,
  longitudeDelta: 0.04,
};

export default function Home() {
  const [coords, setCoords] = useState<Coordinate | null>(null);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const mapRef = useRef<any>(null);
  const router = useRouter();

  const requestLocation = useCallback(async () => {
    try {
      setFetchingLocation(true);
      const { coords: locationCoords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const latest = { latitude: locationCoords.latitude, longitude: locationCoords.longitude };
      setCoords(latest);
      mapRef.current?.animateCamera?.({ center: latest, zoom: 15 }, { duration: 600 });
    } catch {
      Alert.alert("Location", "Unable to fetch your location. Please retry from a safe area.");
    } finally {
      setFetchingLocation(false);
    }
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const composeSOS = useCallback(() => {
    if (!coords) return "SOS! I need help.";
    const url = `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`;
    return `SOS! I need help. My live location: ${url}`;
  }, [coords]);

  const callEmergency = useCallback(() => Linking.openURL(`tel:${EMERGENCY_NUMBER}`), []);
  const notifyTrustedContact = useCallback(() => {
    Linking.openURL(`sms:${TRUSTED_CONTACT_NUMBER}?body=${encodeURIComponent(composeSOS())}`);
  }, [composeSOS]);

  const quickActions: QuickAction[] = [
    {
      id: "profile",
      title: "Profile",
      subtitle: "View & Edit Profile",
      icon: "person-circle-outline",
      onPress: () => router.push('/screens/UserProfile'),
      color: "#0ea5e9",
    },
    {
      id: "settings",
      title: "Settings",
      subtitle: "App Customization",
      icon: "settings-outline",
      onPress: () => router.push('/screens/Settings'),
      color: "#f97316",
    },
    {
      id: "risk-zone-map",
      title: "Risk Zone Map",
      subtitle: "View Risk Zones",
      icon: "map-outline",
      onPress: () => router.push('/screens/RiskZoneMap'),
      color: "#34d399",
    },
    {
      id: "sos",
      title: "SOS",
      subtitle: "Emergency Alert",
      icon: "warning-outline",
      onPress: () => router.push('/screens/SOSScreen'),
      color: "#ef4444",
    },
  ];

  const region: RegionType = coords
    ? { latitude: coords.latitude, longitude: coords.longitude, latitudeDelta: 0.03, longitudeDelta: 0.03 }
    : DEFAULT_REGION;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Welcome</Text>
          <Text style={styles.title}>Tourist Safety App</Text>
        </View>
        <Pressable style={styles.refreshBadge} onPress={requestLocation}>
          <Text style={styles.refreshText}>{fetchingLocation ? "Updating…" : "Refresh"}</Text>
        </Pressable>
      </View>

      {Platform.OS !== 'web' && MapView ? (
        <View style={styles.mapCard}>
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFill}
            provider="google"
            showsUserLocation
            followsUserLocation
            initialRegion={DEFAULT_REGION}
            region={region}
          >
            {coords && <Marker coordinate={coords} title="You" />}
            {SAFE_SPOTS.map((spot) => (
              <SafeSpotMarker key={spot.id} spot={spot} />
            ))}
          </MapView>
          <View style={styles.mapOverlay}>
            <Text style={styles.mapOverlayTitle}>Your Current Location</Text>
            <Text style={styles.mapOverlaySubtitle}>
              {coords ? `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}` : "Fetching..."}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.mapCardPlaceholder}>
          <Text style={styles.placeholderText}>📍 Map View</Text>
          <Text style={styles.placeholderSubtext}>
            {coords ? `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}` : "Location: Fetching..."}
          </Text>
        </View>
      )}

      <View style={styles.quickGrid}>
        {quickActions.map((action) => (
          <QuickActionCard key={action.id} action={action} />
        ))}
      </View>
    </ScrollView>
  );
}

function SafeSpotMarker({ spot }: { spot: SafeSpot }) {
  const tint = spot.type === "hospital" ? "#22d3ee" : spot.type === "embassy" ? "#a855f7" : "#34d399";
  if (!Marker) return null;
  return <Marker coordinate={{ latitude: spot.latitude, longitude: spot.longitude }} pinColor={tint} title={spot.name} />;
}

type QuickAction = {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void | Promise<void>;
  color: string;
};

function QuickActionCard({ action }: { action: QuickAction }) {
  return (
    <Pressable
      onPress={action.onPress}
      style={[styles.quickAction, { borderColor: action.color + '50' }]}
    >
      <Ionicons name={action.icon} size={30} color={action.color} />
      <Text style={styles.quickTitle}>{action.title}</Text>
      <Text style={styles.quickSubtitle}>{action.subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f0f2f5" },
  screenContent: { paddingBottom: 48 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eyebrow: { color: "#6c757d", fontSize: 12, textTransform: "uppercase", letterSpacing: 1.2 },
  title: { color: "#343a40", fontSize: 26, fontWeight: "800", marginTop: 4 },
  refreshBadge: {
    backgroundColor: "#e9ecef",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  refreshText: { color: "#343a40", fontWeight: "600" },
  mapCard: {
    height: 260,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#dee2e6",
    marginBottom: 20,
  },
  mapCardPlaceholder: {
    height: 260,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#e9ecef",
    borderWidth: 1,
    borderColor: "#dee2e6",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 24,
    marginBottom: 8,
    color: "#495057",
  },
  placeholderSubtext: {
    color: "#6c757d",
    fontSize: 14,
  },
  mapOverlay: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 14,
    padding: 12,
  },
  mapOverlayTitle: { color: "#343a40", fontWeight: "700", fontSize: 15 },
  mapOverlaySubtitle: { color: "#6c757d", fontSize: 13, marginTop: 4 },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
    gap: 12,
  },
  quickAction: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  quickTitle: { color: "#343a40", fontWeight: "700", marginTop: 8, fontSize: 16 },
  quickSubtitle: { color: "#6c757d", marginTop: 2, fontSize: 12, textAlign: "center" },
});