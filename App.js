
import {  StyleSheet } from 'react-native';
import Card from './Components/Card';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Topics from './Components/Topics';
import DataStates from './Components/Context';
import { StatusBar } from 'expo-status-bar';

export default function App() {
 
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <DataStates>
        <Stack.Navigator>
         
          <Stack.Screen name="Home" component={Topics} options={({ route }) => ({
            title: "DSA Topics", headerStyle: {
              backgroundColor: "purple",
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          })} />
          <Stack.Screen name="DSA" component={Card} options={({ route }) => ({
            title: route.params.name, headerStyle: {
              backgroundColor: "green",
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          })} /> 
        </Stack.Navigator> 
      </DataStates>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
    marginTop: 50
  },
});
