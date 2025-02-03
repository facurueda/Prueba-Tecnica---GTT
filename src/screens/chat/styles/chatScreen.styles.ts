import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF',
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  pdfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfText: {
    marginLeft: 5,
  },
});
