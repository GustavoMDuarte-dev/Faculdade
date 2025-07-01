import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Database } from './database/Database';
import { useEffect } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CachorroManter from './screens/CachorroManter';
import CachorroListar from './screens/CachorroListar';

const Drawer = createDrawerNavigator();

export default function App() {

  useEffect( () => {
    Database.initDb().then( () => console.log('Banco Inicializado!') );
    //Database.ReinitDb().then( () => console.log('Banco Reinicializado!') );
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Cachorro Manter'>
        <Drawer.Screen name="Cachorro Manter" component={CachorroManter} />
        <Drawer.Screen name="Cachorro Listar" component={CachorroListar} />
      </Drawer.Navigator>
    </NavigationContainer>
    
  );
}