import React from 'react';
import ContactForm from '../components/ContactForm';
import { addContact } from '../data/contact';


export default function NewContactScreen({ navigation }) {

  const handleSaveContact = (contacto) => {

    // Registrar el contacto en el almacenamiento
    addContact(contacto);

    // Confirmar registro
    console.log('Contacto registrado correctamente:', contacto);

    // Regresar a la agenda
    navigation.navigate('Home');
  };

  return (

      <ContactForm
        buttonLabel="Guardar contacto"
        onSaveContact={handleSaveContact}
      />

  );
}
