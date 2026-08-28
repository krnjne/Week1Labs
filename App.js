import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddTasksScreen from './screens/AddTasksScreen';
import WelcomeScreen from './screens/WelcomeScreen';
const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AddTasks" component={AddTasksScreen} options={{ title: 'My Tasks' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}