
import React, { useState, useCallback, useMemo } from 'react';

import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import ContactCard from '../components/ContactCard';
import HeaderMenu from '../components/HeaderMenu';

import { getContacts } from '../data/contact';
import { globalStyles } from '../styles/globalStyles';
import { useTheme } from '../context/ThemeContext';

// ignorar mayúsculas y acentos
const normalizeText = (text) => {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

export default function ContactListScreen({ navigation }) {

  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');

  // Actualizar contactos al regresar a la pantalla
  useFocusEffect(
    useCallback(() => {
      setList(getContacts());
    }, [])
  );

  // filtrar contactos 
  const filteredContacts = useMemo(() => {

    const query = normalizeText(search);

    if (!query) {
      return list;
    }

    return list.filter((contact) => {

      const searchableFields = [
        contact.nombre,
        contact.apellido,
        contact.telefono,
        contact.correo,
        contact.tipo,
      ];

      return searchableFields.some((field) =>
        normalizeText(field).includes(query)
      );

    });

  }, [list, search]);

  return (

    <View style={styles.container}>

      {/* Menú principal */}
      <View style={styles.headerContainer}>
        <HeaderMenu />
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>

        <Text style={styles.searchIcon}>
          🔍
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar contacto..."
          placeholderTextColor={colors.secondary}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />

        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <Text style={styles.clearText}>
              ✕
            </Text>
          </Pressable>
        )}

      </View>

      {/* Lista de contactos */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(contact) => contact.id}
        renderItem={({ item }) => (

          <ContactCard
            contact={item}
            onPress={() =>
              navigation.navigate('EditContact', {
                id: item.id,
              })
            }
          />

        )}
        ListEmptyComponent={

          <Text style={styles.empty}>
            {search.trim()
              ? 'No se encontraron contactos.'
              : 'No hay contactos.'}
          </Text>

        }
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      />

      {/* Btn agregar contacto */}
      <Pressable
        style={globalStyles.button}
        onPress={() => navigation.navigate('NewContact')}
      >
        <Text style={globalStyles.buttonText}>
          Agregar contacto
        </Text>
      </Pressable>

    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },

  headerContainer: {
    marginBottom: 15,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 15,
    height: 50,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    paddingVertical: 8,
  },

  clearText: {
    fontSize: 18,
    color: colors.secondary,
    paddingHorizontal: 5,
  },

  list: {
    flexGrow: 1,
    paddingBottom: 10,
  },

  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
    color: colors.secondary,
  },

});
