import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {IconButton, Appbar, Card, TextInput} from 'react-native-paper';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {pick} from '@react-native-documents/picker';
import FileViewer from 'react-native-file-viewer';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/store';
import {addMessage} from '../../store/chatSlice';
import {RootStackParamList} from '../../navigation/navigation.types';
import {styles} from './styles/chatScreen.styles';
import {Message} from './interfaces/message.interface';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {contactId} = route.params;
  const flatListRef = useRef<FlatList>(null);

  const messages = useSelector(
    (state: RootState) =>
      state.chat.specificChats.find(chat => chat.contactId === contactId)
        ?.messages || [],
  );

  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    flatListRef.current?.scrollToEnd({animated: true});
  }, [messages]);

  const sendMessage = (message: Message) => {
    dispatch(addMessage({contactId, message}));
  };

  const handleFileSelection = async () => {
    try {
      const res = await pick({
        type: ['application/pdf', 'image/*'],
      });

      if (res?.[0]) {
        const {uri, name, type} = res[0];
        const now = new Date();
        const newMsg: Message = {
          sender: 'You',
          content: name!,
          time: now.toLocaleTimeString('es-AR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Argentina/Cordoba',
          }),
          fileUri: uri,
          fileType: type!,
        };

        sendMessage(newMsg);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo seleccionar el archivo');
    }
  };

  const openFile = (uri: string) => {
    FileViewer.open(uri)
      .then(() => console.log('Archivo abierto con éxito'))
      .catch(() => {
        Alert.alert('Error', 'No se pudo abrir el archivo.');
      });
  };

  const functionSend = () => {
    if (newMessage.trim()) {
      const now = new Date();
      sendMessage({
        sender: 'You',
        content: newMessage.trim(),
        time: now.toLocaleTimeString('es-AR', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Argentina/Cordoba',
        }),
      });
      setNewMessage('');
    }
  };

  const renderItem = ({item}: {item: Message}) => (
    <Card
      style={[
        styles.messageContainer,
        item.sender === 'You' ? styles.myMessage : styles.otherMessage,
      ]}>
      <Card.Content>
        {item.fileType?.startsWith('image/') ? (
          <Image source={{uri: item.fileUri}} style={styles.imagePreview} />
        ) : item.fileType === 'application/pdf' ? (
          <TouchableOpacity onPress={() => openFile(item.fileUri!)}>
            <View style={styles.pdfContainer}>
              <IconButton icon="file-pdf-box" size={30} />
              <Text style={styles.pdfText}>{item.content}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <Text style={styles.messageText}>{item.content}</Text>
        )}
        <Text style={styles.messageTime}>{item.time}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Chat" />
      </Appbar.Header>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.list}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Escribe un mensaje..."
          style={styles.input}
        />
        <IconButton icon="send" onPress={functionSend} />
        <IconButton icon="attachment" onPress={handleFileSelection} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
