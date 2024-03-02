import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cadastrar from './Cadastrar';
import Login from './Login';
import CadastroContato from './CadastroContato';
import ListaContatos from './ListaContatos';
import AlteraExcluir from './AlteraExcluir';



const Stack = createNativeStackNavigator();

export default function app (){
    return (

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Login} />
                <Stack.Screen name="Cadastrar" component={Cadastrar} />
                <Stack.Screen name="CadastrarContato" component={CadastroContato} />
                <Stack.Screen name="Lista de Contatos" component={ListaContatos} />
                <Stack.Screen name="Alterar Excluir" component={AlteraExcluir} />
            </Stack.Navigator>
        </NavigationContainer>


    );}