import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);
  const [isLocationSharingEnabled, setIsLocationSharingEnabled] = React.useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>Share Location</Text>
          <Switch
            trackColor={{ false: Theme.colors.lightGray, true: Theme.colors.primary }}
            thumbColor={isLocationSharingEnabled ? Theme.colors.white : Theme.colors.lightGray}
            onValueChange={() => setIsLocationSharingEnabled(previousState => !previousState)}
            value={isLocationSharingEnabled}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>Emergency Alerts</Text>
          <Switch
            trackColor={{ false: Theme.colors.lightGray, true: Theme.colors.primary }}
            thumbColor={isNotificationsEnabled ? Theme.colors.white : Theme.colors.lightGray}
            onValueChange={() => setIsNotificationsEnabled(previousState => !previousState)}
            value={isNotificationsEnabled}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Display</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: Theme.colors.lightGray, true: Theme.colors.primary }}
            thumbColor={isDarkModeEnabled ? Theme.colors.white : Theme.colors.lightGray}
            onValueChange={() => setIsDarkModeEnabled(previousState => !previousState)}
            value={isDarkModeEnabled}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>English</Text>
          <Ionicons name="chevron-forward" size={24} color={Theme.colors.darkGray} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.lightGray,
  },
  itemText: {
    fontSize: Theme.font.size.md,
    fontFamily: Theme.font.family.sans,
    color: Theme.colors.darkGray,
  },
});

export default SettingsScreen;
