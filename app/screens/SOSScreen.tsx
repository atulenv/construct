
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];

const SOSScreen = () => {
  const [alertSent, setAlertSent] = React.useState(false);
  const pulseAnim = new Animated.Value(1);

  const handleSOS = () => {
    setAlertSent(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Your Location"
        />
        <Polyline
          coordinates={[
            { latitude: 37.78825, longitude: -122.4324 },
            { latitude: 37.78925, longitude: -122.4344 },
          ]}
          strokeColor="#007bff"
          strokeWidth={4}
        />
      </MapView>

      <View style={styles.content}>
        {!alertSent ? (
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Text style={styles.sosButtonText}>CALL EMERGENCY</Text>
            </Animated.View>
          </TouchableOpacity>
        ) : (
          <View style={styles.alertMessage}>
            <Text style={styles.alertText}>Alerting authorities… Help is on the way!</Text>
            <View style={styles.timer}>
              <Text style={styles.timerText}>5:00</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  alertMessage: {
    alignItems: 'center',
  },
  alertText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
  },
  timer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 10,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
  },
});

export default SOSScreen;
