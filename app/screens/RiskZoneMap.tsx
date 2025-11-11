
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
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

const RiskZoneMap = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedZone, setSelectedZone] = React.useState(null);

  const riskZones = [
    {
      id: 1,
      name: 'High-Risk Zone A',
      riskLevel: 'High',
      nearestHelp: 'Police Station at 5th Ave',
      coordinates: [
        { latitude: 37.78825, longitude: -122.4324 },
        { latitude: 37.78825, longitude: -122.4344 },
        { latitude: 37.78625, longitude: -122.4344 },
        { latitude: 37.78625, longitude: -122.4324 },
      ],
    },
  ];

  const handleZonePress = (zone) => {
    setSelectedZone(zone);
    setModalVisible(true);
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
        {riskZones.map((zone) => (
          <Polygon
            key={zone.id}
            coordinates={zone.coordinates}
            fillColor="rgba(255, 165, 0, 0.3)"
            strokeColor="rgba(255, 165, 0, 0.8)"
            strokeWidth={2}
            tappable
            onPress={() => handleZonePress(zone)}
          />
        ))}
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="You are here"
        >
          <View style={styles.marker}>
            <Ionicons name="location-sharp" size={30} color="#007bff" />
          </View>
        </Marker>
      </MapView>

      {selectedZone && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedZone.name}</Text>
              <Text style={styles.modalText}>Risk Level: {selectedZone.riskLevel}</Text>
              <Text style={styles.modalText}>Nearest Help: {selectedZone.nearestHelp}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    backgroundColor: 'rgba(0, 123, 255, 0.2)',
    borderRadius: 20,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RiskZoneMap;
