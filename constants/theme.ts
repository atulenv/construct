import { Platform } from 'react-native';

const COLORS = {
  primary: '#4295E4', // Soft Blue
  secondary: '#50C878', // Soft Green
  accent: '#F0E68C', // Soft Yellow for highlighting
  
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  mediumGray: '#D3D3D3',
  darkGray: '#A9A9A9',
  lightBlue: '#E0F7FA', // Light Blue for splash screen gradient
  
  black: '#000000',
  
  // Risk-related colors
  riskLow: '#FFD700', // Gold/Yellow
  riskMedium: '#FFA500', // Orange
  riskHigh: '#FF4500', // OrangeRed
  
  // Status colors
  success: '#28A745', // Green
  warning: '#FFC107', // Yellow
  danger: '#DC3545', // Red
};

const FONT_FAMILY = {
  sans: Platform.select({
    ios: 'Roboto-Regular',
    android: 'Roboto-Regular',
    default: 'sans-serif',
  }),
  sansBold: Platform.select({
    ios: 'Roboto-Bold',
    android: 'Roboto-Bold',
    default: 'sans-serif-bold',
  }),
  mono: Platform.select({
    ios: 'Menlo-Regular',
    android: 'monospace',
    default: 'monospace',
  }),
};

const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
};

const FONT_WEIGHT = {
  light: '300',
  regular: '400',
  medium: '500',
  bold: '700',
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
};

const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const Theme = {
  colors: COLORS,
  font: {
    family: FONT_FAMILY,
    size: FONT_SIZE,
    weight: FONT_WEIGHT,
  },
  spacing: SPACING,
  radius: BORDER_RADIUS,
  shadows: SHADOWS,
};