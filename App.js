
import { StyleSheet} from 'react-native';
import Card from './Components/Card';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profiles from './Components/Profiles';
import Topics from './Components/Topics';
import DataStates from './Components/Context';

export default function App() {
	
	
	const Stack = createNativeStackNavigator();
	return (
		<NavigationContainer>
      <DataStates>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Profiles} options={{ headerTitle: 'Home',headerTitleAlign:"center",headerStyle: {
            backgroundColor: '#BC7AF9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          } }} />
				<Stack.Screen name="DSA" component={Card} options={({ route }) => ({ title: route.params.name ,headerStyle: {
            backgroundColor: route.params.bg,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }})}/>
		  <Stack.Screen name="Topics" component={Topics}  options={({ route }) => ({ title: route.params.name ,headerStyle: {
            backgroundColor: route.params.bg,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }})} />
			</Stack.Navigator>
      </DataStates>
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
