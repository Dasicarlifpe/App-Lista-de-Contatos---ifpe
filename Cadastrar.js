import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function Cadastrar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.titleText}>Cadastro Usuário</Text>
        <Input
          placeholder="Nome"
          inputStyle={styles.input}
        />
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
          onPress={() => navigation.navigate("Home")}
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
