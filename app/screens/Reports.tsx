import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Theme } from '../../constants/theme';

const ReportsScreen = () => {
  const [category, setCategory] = useState('theft');
  const [description, setDescription] = useState('');

  const submitReport = () => {
    // Placeholder: In a real app this would send to a backend and be moderated
    alert('Report submitted — thank you. Our moderation team will review it shortly.');
    setDescription('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: Theme.spacing.md }}>
      <Text style={styles.title}>Report an Incident</Text>

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        {['theft', 'harassment', 'accident', 'weather'].map((c) => (
          <TouchableOpacity key={c} style={[styles.categoryOption, category === c && styles.categorySelected]} onPress={() => setCategory(c)}>
            <Text style={[styles.categoryText, category === c && styles.categoryTextSelected]}>{c.charAt(0).toUpperCase() + c.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Describe what happened..."
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.submitButton} onPress={submitReport}>
        <Text style={styles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { marginTop: Theme.spacing.lg }]}>Map (Tap to add location)</Text>
      <View style={styles.mapPlaceholder}>
        <MapView style={{ flex: 1 }} initialRegion={{ latitude: 37.781, longitude: -122.428, latitudeDelta: 0.03, longitudeDelta: 0.03 }}>
          <Marker coordinate={{ latitude: 37.781, longitude: -122.428 }} />
        </MapView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.white },
  title: { fontSize: Theme.font.size.lg, fontFamily: Theme.font.family.sansBold, color: Theme.colors.primary, marginBottom: Theme.spacing.md },
  label: { fontSize: Theme.font.size.md, fontFamily: Theme.font.family.sans, color: Theme.colors.darkGray, marginBottom: Theme.spacing.xs },
  pickerContainer: { borderWidth: 1, borderColor: Theme.colors.lightGray, borderRadius: Theme.radius.md, marginBottom: Theme.spacing.md, overflow: 'hidden', flexDirection: 'row', flexWrap: 'wrap', padding: Theme.spacing.xs },
  categoryOption: { paddingVertical: Theme.spacing.xs, paddingHorizontal: Theme.spacing.sm, borderRadius: Theme.radius.sm, backgroundColor: Theme.colors.white, marginRight: Theme.spacing.xs, marginBottom: Theme.spacing.xs, borderWidth: 1, borderColor: Theme.colors.lightGray },
  categorySelected: { backgroundColor: Theme.colors.primary, borderColor: Theme.colors.primary },
  categoryText: { color: Theme.colors.darkGray, fontFamily: Theme.font.family.sans },
  categoryTextSelected: { color: Theme.colors.white },
  input: { borderWidth: 1, borderColor: Theme.colors.lightGray, borderRadius: Theme.radius.md, padding: Theme.spacing.sm, textAlignVertical: 'top', marginBottom: Theme.spacing.md },
  submitButton: { backgroundColor: Theme.colors.primary, padding: Theme.spacing.md, borderRadius: Theme.radius.md, alignItems: 'center' },
  submitButtonText: { color: Theme.colors.white, fontFamily: Theme.font.family.sansBold },
  mapPlaceholder: { height: 200, borderRadius: Theme.radius.md, overflow: 'hidden', marginTop: Theme.spacing.md },
});

export default ReportsScreen;
