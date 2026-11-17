import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#2563eb',
  background: '#f4f4f5',
  white: '#ffffff',
  text: '#1f2937',
  textSecondary: '#4b5563',
  border: '#d1d5db',
  borderInput: '#9ca3af',
  inactive: '#9ca3af',
  placeholder: '#6b7280'
};

export const globalStyles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    margin: 16,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});

export const themes = {
  light: {
    background: '#F5F5F5',
    white: '#FFFFFF',
    text: '#000000',
    primary: '#007AFF',
    border: '#E0E0E0',
    inactive: '#8E8E93',
  },
  dark: {
    background: '#121212',
    white: '#1E1E1E',
    text: '#FFFFFF',
    primary: '#0A84FF',
    border: '#2C2C2E',
    inactive: '#636366',
  },
};

