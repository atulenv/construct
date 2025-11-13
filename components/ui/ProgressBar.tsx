import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Theme } from '../../constants/theme';

export default function ProgressBar({ progress = 0 }: { progress?: number }) {
  const pct = Math.max(0, Math.min(1, progress));
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${pct * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 6, backgroundColor: Theme.colors.mediumGray, borderRadius: 6, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: Theme.colors.primary },
});
