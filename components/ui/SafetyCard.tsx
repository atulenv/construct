import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '../../constants/theme';

type Props = {
  title: string;
  subtitle?: string;
  distance?: string;
};

export default function SafetyCard({ title, subtitle, distance }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {distance ? <Text style={styles.distance}>{distance}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radius.md,
    borderWidth: 1,
    borderColor: Theme.colors.lightGray,
    marginBottom: Theme.spacing.sm,
  },
  info: { flex: 1 },
  title: { fontFamily: Theme.font.family.sansBold, color: Theme.colors.primary },
  subtitle: { fontFamily: Theme.font.family.sans, color: Theme.colors.darkGray },
  distance: { fontFamily: Theme.font.family.sans, color: Theme.colors.darkGray },
});
