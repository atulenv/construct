/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Theme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// A permissive helper that returns a color string for the current color scheme.
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: string
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme as 'light' | 'dark'];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    // Fallback: try to read from Theme.colors, otherwise return a sensible default.
    // @ts-ignore - permissive lookup
    return Theme.colors[colorName] ?? Theme.colors.lightGray;
  }
}
