import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from './service/firebaseConfig'; // Importe a instância de autenticação e banco de dados do Firebase
import { collection, addDoc } from 'firebase/firestore';

export default function CadastroContato() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSalvar = async () => {
    try {
      // Obtém o usuário atualmente autenticado
      const user = auth.currentUser;

      if (user) {
        // Adiciona o novo contato ao Firestore
        const contatosCollection = collection(db, 'contatos');
        await addDoc(contatosCollection, {
          nome,
          email,
          telefone,
          userId: user.uid, // Adiciona o UID do usuário ao documento do contato
        });

        // Navega de volta após o cadastro
        navigation.goBack();
      } else {
        console.error('Nenhum usuário autenticado encontrado.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar contato:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.titleText}>Cadastro Contato</Text>
        <Input
          placeholder="Nome"
          inputStyle={styles.input}
          value={nome}
          onChangeText={setNome}
        />
        <Input
          placeholder="Email"
          inputStyle={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Telefone"
          inputStyle={styles.input}
          value={telefone}
          onChangeText={setTelefone}
        />
        <Button
          onPress={handleSalvar}
          title="Salvar"
          buttonStyle={styles.salvarButton}
          titleStyle={styles.salvarButtonText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'black', // Cor de fundo do formulário
    padding: 20,
    width: '80%',
    maxWidth: 400,
    borderRadius: 10, // Borda arredondada
  },
  input: {
    height: 40,
    marginBottom: 20,
    paddingLeft: 10,
    color: 'white', // Cor do texto de entrada
  },
  salvarButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  salvarButtonText: {
    color: 'black', // Cor do texto do botão
    textAlign: 'center',
  },
  titleText: {
    color: 'white',
    backgroundColor: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
  },
});


