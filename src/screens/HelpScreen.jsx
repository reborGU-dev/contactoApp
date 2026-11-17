import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function HelpScreen({ route, navigation }) {
  const { colors, isDarkMode, toggleMenu } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>

      <Ionicons
      name="help-circle-outline"
      size={60}
      color={colors.primary}
      />

      <Text style={styles.title}>
        Ayuda
      </Text>

      <Text style={styles.description}>
        Bienvenido a tu agenda de contactos.
        {'\n\n'}
        Puedes agregar nuevos contactos, editar su
        información y buscar contactos registrados
        mediante la barra de búsqueda.
        {'\n\n'}
        Para modificar un contacto, selecciónalo
        desde la pantalla principal.
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
    padding:25,
  },

    title:{
      fontSize: 22,
      fontWeight: '600',
      color: colors.text,
      marginTop: 5,
  },
    description:{
      fontSize: 14,
      color: colors.text,
      textAlign: 'center',
      lineHeight: 22,
      marginTop: 22,
    },
});