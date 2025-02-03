import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
    fontSize: 12,
    marginBottom: 5,
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 10,
    color: '#007bff',
    fontSize: 14,
    textAlign: 'center',
  },
});
