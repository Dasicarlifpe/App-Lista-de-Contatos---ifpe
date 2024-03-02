import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function ListaContatos(){

    const navigation = useNavigation()

    return(
        <View>
    
   {
    getData.map((linha, i) => (
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
        title={linha.nome}
        subtitle={linha.cpf}
        bottomDivider
        onPress={()=>navigation.navigate('Cadastrar',{
           nome:linha.nome,
           telefone:linha.telefone,
           cpf:linha.cpf,
           id:linha.id,
           alterar:true 
        })}
        chevron
      />
    ))
  }

  </View>
    )
}
    