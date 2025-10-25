export const Colors = {
  background: '#FBFFFB',
  primary: '#83B4FF',
  white: '#FFFFFF',
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    tertiary: '#999999',
  },
  border: '#E0E0E0',
  success: '#66BB6A',
  warning: '#FF9800',
  danger: '#F44336',
  mapBin: {
    empty: '#66BB6A',
    full: '#F44336',
    inProgress: '#83B4FF',
  },
  gradient: {
    top: '#FBFFFB',
    bottom: '#F1F7FF',
  },
} as const;

export default {
  light: {
    text: Colors.text.primary,
    background: Colors.background,
    tint: Colors.primary,
    tabIconDefault: '#999999',
    tabIconSelected: Colors.primary,
  },
};
