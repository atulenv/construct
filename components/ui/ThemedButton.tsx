import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Theme } from '../../constants/theme';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'ghost' | 'danger';
};

export default function ThemedButton({ title, onPress, variant = 'primary' }: Props) {
  const backgroundColor = variant === 'primary' ? Theme.colors.primary : variant === 'danger' ? Theme.colors.danger : Theme.colors.lightGray;
  const textColor = variant === 'primary' || variant === 'danger' ? Theme.colors.white : Theme.colors.darkGray;

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.radius.md,
    alignItems: 'center',
  },
  text: {
    fontFamily: Theme.font.family.sansBold,
    fontSize: Theme.font.size.md,
  },
});
