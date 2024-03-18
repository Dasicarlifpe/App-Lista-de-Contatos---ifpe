import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Header, ListItem, Avatar } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { auth, db } from './service/firebaseConfig'; // Importe a instância de autenticação e banco de dados do Firebase
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function ListaContatos() {
  const navigation = useNavigation();
  const [contatos, setContatos] = useState([]);

  const getContatos = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, 'contatos'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const contatosArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setContatos(contatosArray);
      } else {
        console.error('Nenhum usuário autenticado encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
    }
  };

  // Atualiza os contatos toda vez que a tela for focada
  useFocusEffect(() => {
    getContatos();
  });

  const handleContatoPress = (contato) => {
    navigation.navigate('AlteraExcluir', contato);
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.headerContainer}
        centerComponent={{ text: 'Lista', style: styles.headerText }}
        rightComponent={
          <Button
            title="Adicionar"
            onPress={() => navigation.navigate('CadastroContato')}
            buttonStyle={styles.addButton}
            titleStyle={styles.addButtonText}
          />
        }
        leftComponent={
          <Button
            title="Logout"
            onPress={() => navigation.navigate('Home')}
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
              <Avatar source={require('./public/login.png')} rounded />
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
