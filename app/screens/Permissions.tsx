import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Theme } from '../../constants/theme';
import { useRouter } from 'expo-router';

const PermissionsScreen = () => {
  const router = useRouter();
  const [locationPermission, setLocationPermission] = React.useState(false);
  const [notificationPermission, setNotificationPermission] = React.useState(false);

  const handleGrantPermissions = () => {
    if (locationPermission && notificationPermission) {
      router.replace('/tabs/home');
    } else {
      alert('Please grant all permissions to continue.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>We need your permission to ensure your safety</Text>
      <Text style={styles.instructions}>
        To provide you with the best safety features, we need access to your location and permission to send notifications.
      </Text>

      <View style={styles.permissionRow}>
        <Text style={styles.permissionText}>Location Access</Text>
        <Switch
          trackColor={{ false: Theme.colors.lightGray, true: Theme.colors.primary }}
          thumbColor={locationPermission ? Theme.colors.white : Theme.colors.lightGray}
          onValueChange={() => setLocationPermission(previousState => !previousState)}
          value={locationPermission}
        />
      </View>

      <View style={styles.permissionRow}>
        <Text style={styles.permissionText}>Notification Access</Text>
        <Switch
          trackColor={{ false: Theme.colors.lightGray, true: Theme.colors.primary }}
          thumbColor={notificationPermission ? Theme.colors.white : Theme.colors.lightGray}
          onValueChange={() => setNotificationPermission(previousState => !previousState)}
          value={notificationPermission}
        />
      </View>

      <TouchableOpacity style={styles.grantButton} onPress={handleGrantPermissions}>
        <Text style={styles.grantButtonText}>Grant Permissions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.rejectButton} onPress={() => alert('Permissions rejected')}>
        <Text style={styles.rejectButtonText}>Reject Permissions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    padding: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.font.size.xl,
    fontFamily: Theme.font.family.sansBold,
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
    color: Theme.colors.primary,
  },
  instructions: {
    fontSize: Theme.font.size.md,
    fontFamily: Theme.font.family.sans,
    textAlign: 'center',
    marginBottom: Theme.spacing.lg,
    color: Theme.colors.darkGray,
  },
  permissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.lightGray,
  },
  permissionText: {
    fontSize: Theme.font.size.md,
    fontFamily: Theme.font.family.sans,
  },
  grantButton: {
    backgroundColor: Theme.colors.primary,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    alignItems: 'center',
    marginTop: Theme.spacing.lg,
  },
  grantButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.font.size.lg,
    fontFamily: Theme.font.family.sansBold,
  },
  rejectButton: {
    backgroundColor: Theme.colors.lightGray,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    alignItems: 'center',
    marginTop: Theme.spacing.md,
  },
  rejectButtonText: {
    color: Theme.colors.darkGray,
    fontSize: Theme.font.size.lg,
    fontFamily: Theme.font.family.sansBold,
  },
});

export default PermissionsScreen;
