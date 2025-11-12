import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const UserProfileScreen = () => {
  const emergencyContacts = [
    { id: 1, name: 'John Doe', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', phone: '098-765-4321' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Appleseed</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        {emergencyContacts.map(contact => (
          <View key={contact.id} style={styles.contactItem}>
            <View>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="create-outline" size={24} color={Theme.colors.primary} />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color={Theme.colors.primary} />
          <Text style={styles.addButtonText}>Add Contact</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Alerts</Text>
        {/* Placeholder for recent alerts */}
        <View style={styles.alertItem}>
          <Text style={styles.alertText}>High risk zone detected near your location.</Text>
          <Text style={styles.alertDate}>2 hours ago</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  profileHeader: {
    alignItems: 'center',
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.lightGray,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Theme.colors.primary,
  },
  profileName: {
    marginTop: Theme.spacing.md,
    fontSize: Theme.font.size.xl,
    fontFamily: Theme.font.family.sansBold,
    color: Theme.colors.primary,
  },
  section: {
    marginTop: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.font.size.lg,
    fontFamily: Theme.font.family.sansBold,
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.md,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.lightGray,
  },
  contactName: {
    fontSize: Theme.font.size.md,
    fontFamily: Theme.font.family.sans,
  },
  contactPhone: {
    fontSize: Theme.font.size.sm,
    color: Theme.colors.darkGray,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.md,
  },
  addButtonText: {
    marginLeft: Theme.spacing.sm,
    fontSize: Theme.font.size.md,
    color: Theme.colors.primary,
    fontFamily: Theme.font.family.sans,
  },
  alertItem: {
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.lightGray,
    borderRadius: Theme.radius.md,
    marginBottom: Theme.spacing.md,
  },
  alertText: {
    fontSize: Theme.font.size.md,
    fontFamily: Theme.font.family.sans,
  },
  alertDate: {
    fontSize: Theme.font.size.sm,
    color: Theme.colors.darkGray,
    marginTop: Theme.spacing.sm,
  },
});

export default UserProfileScreen;
