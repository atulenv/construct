import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Theme } from '../../constants/theme';

const HelpScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>How do I add an emergency contact?</Text>
          <Text style={styles.faqAnswer}>
            Go to your Profile, tap on &apos;Emergency Contacts&apos;, and then &apos;Add Contact&apos;.
          </Text>
        </View>
        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>How do I report an unsafe zone?</Text>
          <Text style={styles.faqAnswer}>
            From the home screen, tap on the &apos;Report&apos; button and fill in the details of the unsafe zone.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactItem}>
          <Ionicons name="mail-outline" size={24} color={Theme.colors.primary} />
          <Text style={styles.contactText}>support@touristsafety.com</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="call-outline" size={24} color={Theme.colors.primary} />
          <Text style={styles.contactText}>+1 (800) 123-4567</Text>
        </View>
      </View>
    </ScrollView>
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
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.font.size.lg,
    fontFamily: Theme.font.family.sansBold,
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.md,
  },
  faqItem: {
    marginBottom: Theme.spacing.md,
  },
  faqQuestion: {
    fontSize: Theme.font.size.md,
    fontFamily: Theme.font.family.sansBold,
  },
  faqAnswer: {
    fontSize: Theme.font.size.md,
    fontFamily: Theme.font.family.sans,
    color: Theme.colors.darkGray,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  contactText: {
    fontSize: Theme.font.size.md,
    fontFamily: Theme.font.family.sans,
    marginLeft: Theme.spacing.md,
  },
});

export default HelpScreen;