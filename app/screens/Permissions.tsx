
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';

const PermissionsScreen = () => {
  const [locationPermission, setLocationPermission] = React.useState(false);
  const [notificationPermission, setNotificationPermission] = React.useState(false);
  const fadeAnim = new Animated.Value(0);
  const router = useRouter();

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleGrant = async () => {
    if (locationPermission) {
      await Location.requestForegroundPermissionsAsync();
    }
    if (notificationPermission) {
      await Notifications.requestPermissionsAsync();
    }
    router.push('/home');
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>We need your permission to ensure your safety</Text>

      <View style={styles.permissionRow}>
        <Ionicons name="location-outline" size={30} color="#007bff" />
        <Text style={styles.permissionText}>Location Permission</Text>
        <Switch
          value={locationPermission}
          onValueChange={setLocationPermission}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={locationPermission ? '#007bff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.permissionRow}>
        <Ionicons name="notifications-outline" size={30} color="#007bff" />
        <Text style={styles.permissionText}>Notifications Permission</Text>
        <Switch
          value={notificationPermission}
          onValueChange={setNotificationPermission}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={notificationPermission ? '#007bff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.grantButton]} onPress={handleGrant}>
          <Text style={styles.buttonText}>Grant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rejectButton]}>
          <Text style={[styles.buttonText, styles.rejectButtonText]}>Reject</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#343a40',
    textAlign: 'center',
    marginBottom: 40,
  },
  permissionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  permissionText: {
    fontSize: 18,
    color: '#495057',
    flex: 1,
    marginLeft: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 40,
    width: '100%',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  grantButton: {
    backgroundColor: '#28a745',
  },
  rejectButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rejectButtonText: {
    color: '#fff',
  },
});

export default PermissionsScreen;
