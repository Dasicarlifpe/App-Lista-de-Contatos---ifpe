import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "./service/firebaseConfig";
import { addDoc, collection, getDocs} from "firebase/firestore";

export default function Cadastrar() {
  const navigation = useNavigation();
  const [name, setname ]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const usuariosCollection = collection(db, 'usuarios');

  async function cadastrarBd() {
    // Obtém o usuário atualmente autenticado
    const user = auth.currentUser;
  
    if (user) {
      // Adiciona o UID do usuário ao documento do contato
      const userUid = user.uid;
      const contactData = { name, email, password, userId: userUid };
  
      // Adiciona o documento ao Firestore
      await addDoc(usuariosCollection, contactData);
  
      console.log("Contato cadastrado com sucesso!");
    } else {
      console.error("Nenhum usuário autenticado encontrado.");
    }
  }
  

  async function handleRegistrar() {
    if (password.length < 6) {
      console.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuário cadastrado com sucesso!");
      
      // Aqui você pode chamar a função para cadastrar no banco de dados após o cadastro de autenticação
      cadastrarBd();
      
      // Aqui você pode navegar para outra tela se necessário
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.titleText}>Cadastro Usuário</Text>

        <Input
          value={name}
          onChangeText={(text) => setname(text)}
          inputStyle={styles.input}
          placeholder="Nome"
        />
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          inputStyle={styles.input}
          placeholder="Email"
        />
        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          inputStyle={styles.input}
          placeholder="Senha"
        />
        <Button
          onPress={handleRegistrar}
          title="Cadastrar"
          buttonStyle={styles.cadastrarButton}
          titleStyle={styles.cadastrarButtonText}
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
  cadastrarButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  cadastrarButtonText: {
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
