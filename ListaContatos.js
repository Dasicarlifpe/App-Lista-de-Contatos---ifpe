import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Header, ListItem, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export default function ListaContatos() {
  const navigation = useNavigation();
  const [contatos, setContatos] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/list');
          setContatos(response.data);
        } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
        }
      };

      fetchData();
    }, [])
  );

  const handleContatoPress = (contato) => {
    // Navegar para a tela de detalhes/editar com os detalhes do contato
    navigation.navigate('AlteraExcluir', contato);
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.headerContainer}
        centerComponent={{ text: 'Lista', style: styles.headerText }}
        rightComponent={
          <Button
            title="+"
            onPress={() => navigation.navigate('CadastroContato')}
            buttonStyle={styles.addButton}
            titleStyle={styles.addButtonText}
          />
        }
      />

      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleContatoPress(item)}>
            <ListItem bottomDivider containerStyle={styles.listItem}>
              <Avatar
                source={require('./public/login.png')} 
                rounded
              />
              <ListItem.Content>
                <ListItem.Title style={styles.contactName}>{item.nome}</ListItem.Title>
                <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
                <ListItem.Subtitle>{item.telefone}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Cor de fundo da tela
  },
  headerContainer: {
    backgroundColor: 'black', // Cor de fundo do cabeçalho
  },
  headerText: {
    color: 'white', // Cor do texto do cabeçalho
    fontSize: 20,
  },
  addButton: {
    backgroundColor: 'black',
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
  },
  contactName: {
    fontWeight: 'bold',
    color: 'black', 
  },
  listItem: {
    alignItems: 'center',
  },
});
