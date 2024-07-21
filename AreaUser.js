import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";



export default function AreaUSer (){

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.titleText}>Seleção</Text>
    
            <Button
            title="Lista de Contatos"
            onPress={() => navigation.navigate('ListaContatos')}
            buttonStyle={styles.fotoButton}
            titleStyle={styles.fotoButtonText}
          />

             <Button
            title="Galeria de Fotos"
            onPress={() => navigation.navigate('Foto')}
            buttonStyle={styles.fotoButton}
            titleStyle={styles.fotoButtonText}
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
     
      fotoButton: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20,
      },
      fotoButtonText: {
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
