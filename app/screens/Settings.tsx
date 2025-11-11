
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Settings = () => {
  const [dataSharing, setDataSharing] = React.useState(false);
  const [theme, setTheme] = React.useState('light');
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>
          <View style={styles.setting}>
            <Text style={styles.settingText}>Enable Data Sharing</Text>
            <Switch
              value={dataSharing}
              onValueChange={setDataSharing}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={dataSharing ? '#007bff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Theme</Text>
          <View style={styles.themeSwitch}>
            <TouchableOpacity
              style={[styles.themeButton, theme === 'light' && styles.activeTheme]}
              onPress={() => setTheme('light')}
            >
              <Ionicons name="sunny-outline" size={24} color={theme === 'light' ? '#fff' : '#000'} />
              <Text style={[styles.themeButtonText, theme === 'light' && styles.activeThemeText]}>
                Light
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeButton, theme === 'dark' && styles.activeTheme]}
              onPress={() => setTheme('dark')}
            >
              <Ionicons name="moon-outline" size={24} color={theme === 'dark' ? '#fff' : '#000'} />
              <Text style={[styles.themeButtonText, theme === 'dark' && styles.activeThemeText]}>
                Dark
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
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
    color: '#333',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 16,
    color: '#555',
  },
  themeSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    padding: 5,
  },
  themeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeTheme: {
    backgroundColor: '#007bff',
  },
  themeButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  activeThemeText: {
    color: '#fff',
  },
});

export default Settings;
