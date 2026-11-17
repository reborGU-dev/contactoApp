import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@react-navigation/native';

export default function DateField({
  label,
  value,
  onChange,
}) {
  const { colors, isDarkMode } = useTheme();
  const styles = createStyles(colors);
  const [showPicker, setShowPicker] = useState(false);

  const fechaInicial = value
    ? new Date(`${value}T12:00:00`)
    : new Date();

  const handleChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (selectedDate) {
      const year = selectedDate.getFullYear();

      const month = String(
        selectedDate.getMonth() + 1
      ).padStart(2, '0');

      const day = String(
        selectedDate.getDate()
      ).padStart(2, '0');

      onChange(`${year}-${month}-${day}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.dateText,
            !value && styles.placeholder,
          ]}
        >
          {value || 'Seleccionar fecha'}
        </Text>

        <Ionicons
          name="calendar-outline"
          size={20}
          color={colors.inactive}
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={fechaInicial}
          mode="date"
          display={
            Platform.OS === 'android'
              ? 'spinner'
              : 'default'
          }
          maximumDate={new Date()}
          themeVariant={isDarkMode ? 'dark' : 'light'}
          textColor={'colors.text'}
          onChange={handleChange}
        />
      )}
    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 7,
  },

  dateInput: {
    height: 45,
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: 11,
    paddingHorizontal: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dateText: {
    fontSize: 14,
    color: colors.text,
  },

  placeholder: {
    color: colors.placeholder,
  },
});