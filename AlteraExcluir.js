import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function AlteraExcluir(){

    const navigation = useNavigation()

    return (
       <View style={{ flex: 1}}>
      <Header
      leftComponent={
          <Button  
          title="< Voltar"
          onPress={()=>navigation.navigate("ListaContatos")}
          ></Button>}
          centerComponent={{ text: 'Cadastro de Clientes', style: { color: '#fff' } }}
      
      />


      
      <Text style={styles.titleText}>Cadastro Contato</Text>


        <Input
          placeholder="Nome"
          inputStyle={styles.input}
        />
        <Input
          placeholder="Email"
          inputStyle={styles.input}  
        />
        <Input
          placeholder="Telefone"
          inputStyle={styles.input}  
        />
        <Button
        onPress={()=>navigation.navigate("Home")}
          title="Alatera"
          buttonStyle={styles.loginButton}
          titleStyle={styles.loginButtonText}
        />
        <Button
          title="Excluir"
          buttonStyle={styles.loginButton}
          titleStyle={styles.loginButtonText}
        />

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

  titleText:{
    color: "white", 
    backgroundColor: 'black',
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 30 
  }
});