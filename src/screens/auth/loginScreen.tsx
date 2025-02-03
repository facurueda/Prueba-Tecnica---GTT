import React from 'react';
import {View, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {TextInput, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {login} from '../../store/authSlice';
import {setProfile} from '../../store/userProfileSlice';
import {loginSchema} from './schemas/loginSchema';
import {LoginFormData} from './interfaces/loginscreen.interfaces';
import users from '../../data/users.json';
import CustomButton from '../../components/button';
import {styles} from './styles/loginScreen.styles';

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    const user = users.find(
      u => u.email === data.email && u.password === data.password,
    );

    if (user) {
      dispatch(login(user.token));
      dispatch(
        setProfile({
          ...user.profile,
          status: user.profile.status as 'Online' | 'Offline',
        }),
      );
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
      navigation.reset({
        index: 0,
        routes: [{name: 'ChatList'}] as never[],
      });
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Iniciar Sesión
      </Text>
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, value}}) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, value}}) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </>
        )}
      />

      <CustomButton title="Ingresar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default LoginScreen;
