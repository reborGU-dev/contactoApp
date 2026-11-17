
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Pressable, Text } from 'react-native';

import ContactForm from '../components/ContactForm';
import { getContact, updateContact, deleteContact } from '../data/contact';
import { useTheme } from '../context/ThemeContext';
import { ScrollView } from 'react-native-gesture-handler';


export default function EditContactScreen({ route, navigation }) {

  const { id } = route.params;
  const { colors } = useTheme();


  const [currentContact, setCurrentContact] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const contact = getContact(id);

    if (contact) {
      setCurrentContact(contact);
    }

    setLoaded(true);
  }, [id]);

  //actualiza al contacto
  const handleSave = (data) => {
    updateContact(id, data);
    navigation.goBack();
  };
  const handleDelete = () => {
    Alert.alert(
      'Eliminar contacto',
      `¿Seguro que quieres eliminar a ${currentContact.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteContact(id);
            navigation.goBack();
          },
        },
      ]
    );
  };
  const styles = createStyles(colors);

  if (!loaded || !currentContact) return null;

  return (
    <ScrollView>
    <View style={styles.container}>
      <ContactForm
        buttonLabel="Editar"
        initialData={currentContact}
        onSaveContact={handleSave}
      />

    
    {/* Btn para eliminar usuario (solo sale en esta pantalla) */}
      <Pressable
        style={styles.deleteButton}
        onPress={handleDelete}>
        
      <Text 
        style={styles.deleteText}> 
          Eliminar
      </Text>
      </Pressable>
      </View>
    </ScrollView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },

  deleteButton: {
      borderWidth: 1,
      borderColor: colors.danger,
      padding: 15,
      borderRadius: 10,
      marginHorizontal: 15,
      alignItems: 'center',
  },
  deleteText: {
      color: colors.danger,
      fontSize: 15,
      fontWeight: '600',
  },
});
