

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserProfile = () => {
  const [notifications, setNotifications] = React.useState(true);
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImage}>
            <Ionicons name="person-outline" size={80} color="#ccc" />
          </View>
          <Text style={styles.profileName}>John Doe</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <View style={styles.contact}>
            <Text style={styles.contactName}>Jane Doe</Text>
            <Text style={styles.contactRelation}>Spouse</Text>
          </View>
          <View style={styles.contact}>
            <Text style={styles.contactName}>Peter Jones</Text>
            <Text style={styles.contactRelation}>Friend</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle-outline" size={24} color="#007bff" />
            <Text style={styles.addButtonText}>Add Contact</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Preferences</Text>
          <View style={styles.preference}>
            <Text style={styles.preferenceText}>Enable Emergency Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notifications ? '#007bff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Previous Alerts</Text>
          <View style={styles.alert}>
            <Text style={styles.alertText}>High-risk zone alert - 12/10/2023</Text>
          </View>
          <View style={styles.alert}>
            <Text style={styles.alertText}>Safety check-in request - 11/28/2023</Text>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#495057',
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  contactName: {
    fontSize: 16,
    color: '#343a40',
  },
  contactRelation: {
    fontSize: 14,
    color: '#6c757d',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  addButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007bff',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  preferenceText: {
    fontSize: 16,
    color: '#343a40',
  },
  alert: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  alertText: {
    fontSize: 16,
    color: '#343a40',
  },
});

export default UserProfile;

