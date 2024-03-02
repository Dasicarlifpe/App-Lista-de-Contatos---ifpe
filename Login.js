import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


export default function Login ()  {

  const navigation = useNavigation()

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
        />
        <Input
          placeholder="Senha"
          secureTextEntry
          inputStyle={styles.input}
        />
        <Button
          onPress={()=>navigation.navigate("Lista de Contatos")}
          title="Logar"
          buttonStyle={styles.loginButton}
          titleStyle={styles.loginButtonText}
        />
         <Button
         onPress={()=>navigation.navigate("Cadastrar")}
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
    width:'100px',
    height: '100px',
    marginBottom: 40

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
    marginBottom: 20
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});


