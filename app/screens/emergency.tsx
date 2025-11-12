import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const emergencyServices = [
  { id: '1', name: 'Police', icon: 'shield-outline', phone: '100' },
  { id: '2', name: 'Ambulance', icon: 'medical-outline', phone: '101' },
  { id: '3', name: 'Fire Department', icon: 'flame-outline', phone: '102' },
  { id: '4', name: 'Disaster Management', icon: 'business-outline', phone: '108' },
];

const EmergencyScreen = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.serviceItem}>
      <Ionicons name={item.icon} size={32} color={Theme.colors.primary} />
      <Text style={styles.serviceName}>{item.name}</Text>
      <TouchableOpacity style={styles.callButton}>
        <Ionicons name="call-outline" size={24} color={Theme.colors.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Services</Text>
      <FlatList
        data={emergencyServices}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
    padding: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.font.size.xl,
    fontFamily: Theme.font.family.sansBold,
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.lg,
    textAlign: 'center',
  },
  list: {
    flexGrow: 1,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.lightGray,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    marginBottom: Theme.spacing.md,
  },
  serviceName: {
    flex: 1,
    fontSize: Theme.font.size.lg,
    fontFamily: Theme.font.family.sans,
    marginLeft: Theme.spacing.md,
  },
  callButton: {
    backgroundColor: Theme.colors.primary,
    padding: Theme.spacing.sm,
    borderRadius: Theme.radius.full,
  },
});

export default EmergencyScreen;