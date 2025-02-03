import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarOnline: {
    borderWidth: 8,
    borderColor: 'green',
    borderRadius: 100,
  },
  avatarOffline: {
    borderWidth: 8,
    borderColor: 'gray',
    borderRadius: 100,
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
    fontSize: 12,
    marginBottom: 5,
  },
  contentContainer: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  buttonDisabled: {
    marginTop: 10,
    backgroundColor: 'gray',
  },
  buttonLogout: {
    marginTop: 10,
    backgroundColor: 'red',
  },
});
