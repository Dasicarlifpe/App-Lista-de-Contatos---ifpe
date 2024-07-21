import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from './service/firebaseConfig'; 

export default function Login ()  {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Autentica o usuário usando o email e senha fornecidos
      await signInWithEmailAndPassword(auth, email, password);
      
      // Navega para a tela de ListaContatos após o login bem-sucedido
      navigation.navigate("AreaUser");
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        source={require('./public/login.png')}
        rounded
        style={styles.backgroundImage}
      />
      <View style={styles.formContainer}>
        <Input
          placeholder="Email"
          inputStyle={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Senha"
          secureTextEntry
          inputStyle={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <Button
          onPress={handleLogin}
          title="Logar"
          buttonStyle={styles.loginButton}
          titleStyle={styles.loginButtonText}
        />
        <Button
          onPress={() => navigation.navigate("Cadastrar")}
          title="Cadastrar"
          buttonStyle={styles.loginButton}
          titleStyle={styles.loginButtonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  input: {
    height: 40,
    marginBottom: 20,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});




