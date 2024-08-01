import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './screens/Home';
import Cadastro from './screens/Cadastro';
import Editar from './screens/Editar';
import {TouchableOpacity, StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            title: 'Imóveis',
            headerRight: props => (
              <TouchableOpacity>
                <Icon
                  name="add-circle"
                  style={styles.icon}
                  onPress={() => navigation.navigate('Cadastrar')}
                />
              </TouchableOpacity>
            ),
          })}></Stack.Screen>
        <Stack.Screen
          name="Cadastrar"
          component={Cadastro}
          options={{
            title: 'Adicionar',
          }}></Stack.Screen>
        <Stack.Screen name="Editar" component={Editar}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 25,
    color: '#0B1D51',
  },
});

export default App;
