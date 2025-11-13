import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../../constants/theme';

export default function SOSButton({ onPress }: { onPress?: () => void }) {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => Animated.timing(scale, { toValue: 1.05, duration: 120, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }).start();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.container}
    >
      <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
        <Ionicons name="alert-circle" size={36} color={Theme.colors.white} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { alignSelf: 'center' },
  button: {
    backgroundColor: Theme.colors.danger,
    width: 84,
    height: 84,
    borderRadius: Theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Theme.colors.darkGray,
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
});
