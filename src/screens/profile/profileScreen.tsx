import React, {useState} from 'react';
import {
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  Appbar,
  Avatar,
  TextInput,
  Text,
  Menu,
  Switch,
} from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  changePhoto,
  changeStatus,
  setProfile,
} from '../../store/userProfileSlice';
import {ScrollView} from 'react-native-gesture-handler';
import {RootState} from '../../store/store';
import {styles} from './styles/profileScreen.styles';
import CustomButton from '../../components/button';
import {logout} from '../../store/authSlice';
import {profileSchema} from './schemas/profileSchema';
import {profileFormData} from './interfaces/profileFormData.interface';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userProfile = useSelector(
    (state: RootState) => state.userProfile.profile,
  );

  const pickImage = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        dispatch(changePhoto(response.assets[0].uri!));
        Alert.alert('Éxito', 'Se cambio la foto de perfil');
      }
    });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}] as never,
    });
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: {errors, isDirty},
  } = useForm<profileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: userProfile?.name,
      lastName: userProfile?.lastName,
      dateOfBirth: userProfile?.dateOfBirth,
      phone: userProfile?.phone,
    },
  });

  const [open, setOpen] = useState(false);

  const handleDateChange = (date: Date) => {
    setValue('dateOfBirth', date.toISOString(), {shouldDirty: true});
    setOpen(false);
  };

  const onSubmit = (data: profileFormData) => {
    dispatch(setProfile(data));
    Alert.alert('Éxito', 'Se cambio la información de perfil');
  };

  const changeStatusSwitch = (value: boolean) => {
    const newStatus = value ? 'Online' : 'Offline';
    console.log('Changing status to:', newStatus);
    dispatch(changeStatus(newStatus));
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Perfil" />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.contentContainer}>
            <View style={styles.avatarContainer}>
              <Pressable
                style={
                  userProfile.status === 'Online'
                    ? styles.avatarOnline
                    : styles.avatarOffline
                }
                onPress={pickImage}>
                <Avatar.Image size={100} source={{uri: userProfile.photo}} />
              </Pressable>
            </View>

            <View style={styles.statusContainer}>
              <Text>Estado: {userProfile?.status}</Text>

              <Switch
                value={userProfile?.status === 'Online' ? true : false}
                onValueChange={changeStatusSwitch}
              />
            </View>
            <Controller
              control={control}
              name="name"
              render={({field: {onChange, value}}) => (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    autoCapitalize="none"
                    label={'Nombre'}
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                  />
                  {errors.name && (
                    <Text style={styles.error}>{errors.name.message}</Text>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name="lastName"
              render={({field: {onChange, value}}) => (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Apellido"
                    autoCapitalize="none"
                    label={'Apellido'}
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                  />
                  {errors.lastName && (
                    <Text style={styles.error}>{errors.lastName.message}</Text>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name="dateOfBirth"
              render={({field: {onChange, value}}) => (
                <>
                  <Pressable onPress={() => setOpen(true)}>
                    <TextInput
                      style={styles.input}
                      mode="outlined"
                      label="Fecha de Nacimiento"
                      value={new Date(value).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                      editable={false}
                    />
                  </Pressable>
                  {errors.dateOfBirth && (
                    <Text style={styles.error}>
                      {errors.dateOfBirth.message}
                    </Text>
                  )}
                </>
              )}
            />

            <DatePicker
              modal
              open={open}
              date={new Date()}
              mode="date"
              onConfirm={handleDateChange}
              onCancel={() => setOpen(false)}
            />

            <Controller
              control={control}
              name="phone"
              render={({field: {onChange, value}}) => (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    autoCapitalize="none"
                    label={'Teléfono'}
                    keyboardType="phone-pad"
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                  />
                  {errors.phone && (
                    <Text style={styles.error}>{errors.phone.message}</Text>
                  )}
                </>
              )}
            />

            <CustomButton
              title="Guardar Cambios"
              onPress={handleSubmit(onSubmit)}
              disabled={!isDirty}
              style={!isDirty ? styles.buttonDisabled : styles.button}
            />

            <CustomButton
              title="Cerrar sesión"
              onPress={handleLogout}
              style={[styles.buttonLogout]}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfileScreen;
