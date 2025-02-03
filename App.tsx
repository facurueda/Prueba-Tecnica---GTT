import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadToken} from './src/store/authSlice';
import {persistor, store} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import users from './src/data/users.json';
import { setProfile } from './src/store/userProfileSlice';

const AppWrapper = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if(token){
        const user = users.find(u => u.token === token);
        dispatch(setProfile(user!.profile));
      }
      dispatch(loadToken(token));
    };

    checkAuth();
  }, []);

  return <AppNavigator />;
};

const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <PaperProvider>
            <AppWrapper />
          </PaperProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
