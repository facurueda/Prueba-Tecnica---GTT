import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/auth/loginScreen';
import ChatListScreen from '../screens/chat/chatListScreen';
import ChatScreen from '../screens/chat/chatScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from './navigation.types';
import ProfileScreen from '../screens/profile/profileScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [loading, setLoading] = React.useState(true);
  const [initialRoute, setInitialRoute] = React.useState<'Login' | 'ChatList'>(
    'Login',
  );

  React.useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        setInitialRoute('ChatList');
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ChatList" component={ChatListScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
