import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {Chat} from './interfaces/chat.interfaces';
import {styles} from './styles/chatListScreen.styles';
import {RootStackParamList} from '../../navigation/navigation.types';
import {StackNavigationProp} from '@react-navigation/stack';

type ChatListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChatList'
>;

const ChatItem = ({item}: {item: Chat}) => {
  const navigation = useNavigation<ChatListScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('Chat', {contactId: item.contact.id})}>
      <Image source={{uri: item.image}} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>
          {item.contact.name} {item.contact.lastName}
        </Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.time}>{item.lastMessageTime}</Text>
    </TouchableOpacity>
  );
};

const ChatListScreen = () => {
  const navigation = useNavigation<ChatListScreenNavigationProp>();
  const userProfile = useSelector(
    (state: RootState) => state.userProfile.profile,
  );
  const chats = useSelector((state: RootState) => state.chat.chats);

  const avatarStyle =
    userProfile.status === 'Online'
      ? styles.avatarOnline
      : styles.avatarOffline;

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Chats" />
        <View style={styles.avatarContainer}>
          <Pressable
            style={avatarStyle}
            onPress={() => navigation.navigate('Profile')}>
            <Avatar.Image size={50} source={{uri: userProfile.photo}} />
          </Pressable>
        </View>
      </Appbar.Header>

      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ChatItem item={item} />}
      />
    </View>
  );
};

export default ChatListScreen;
