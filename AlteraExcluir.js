import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from './service/firebaseConfig'; 
import { collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function AlteraExcluir({ route }) {
  const navigation = useNavigation();
  const { nome, email, telefone, id } = route.params;
  const [editedNome, setEditedNome] = useState(nome);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedTelefone, setEditedTelefone] = useState(telefone);

  const handleSalvar = async () => {
    try {
      // Atualiza os dados do contato no Firestore no banco
      await updateDoc(doc(db, 'contatos', id), {
        nome: editedNome,
        email: editedEmail,
        telefone: editedTelefone,
      });

      // Navega de volta após salvar as alterações
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  const handleExcluir = async () => {
    try {
      // Exclui o contato do Firestore
      await deleteDoc(doc(db, 'contatos', id));

      // Navega de volta após excluir o contato
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao excluir o contato:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Editar Contato</Text>

      <Input
        placeholder="Nome"
        inputStyle={styles.input}
        value={editedNome}
        onChangeText={setEditedNome}
      />
      <Input
        placeholder="Email"
        inputStyle={styles.input}
        value={editedEmail}
        onChangeText={setEditedEmail}
      />
      <Input
        placeholder="Telefone"
        inputStyle={styles.input}
        value={editedTelefone}
        onChangeText={setEditedTelefone}
      />
      <Button
        onPress={handleSalvar}
        title="Salvar"
        buttonStyle={styles.saveButton}
        titleStyle={styles.saveButtonText}
      />
      <Button
        onPress={handleExcluir}
        title="Excluir"
        buttonStyle={styles.deleteButton}
        titleStyle={styles.deleteButtonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginBottom: 20,
    paddingLeft: 10,
    color: 'white', // Cor do texto de entrada
  },
  saveButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'black',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'white', 
    borderRadius: 5,
    marginBottom: 20,
  },
  deleteButtonText: {
    color: 'black',
    textAlign: 'center',
  },
});

