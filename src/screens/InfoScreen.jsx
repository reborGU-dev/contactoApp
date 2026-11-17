import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';


import { useTheme } from '../context/ThemeContext';



export default function InfoScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (

      <View style={styles.container}>

        <Ionicons
          name="information-circle-outline"
          size={60}
          color={colors.primary}
        />

        <Text style={styles.title}>
          Agenda de Contactos
        </Text>

        <Text style={styles.version}>
          Versión 1.0.0
        </Text>

        <Text style={styles.description}>
          Aplicación móvil desarrollada con React Native
          y Expo para administrar información personal
          de contactos de manera sencilla.
        </Text>

      </View>

  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    marginTop: 15,
  },

  version: {
    fontSize: 14,
    color: colors.inactive,
    marginTop: 5,
  },

  description: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 20,
  },
});