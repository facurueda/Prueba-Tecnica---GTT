import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Message {
  sender: string;
  content: string;
  time: string;
  fileUri?: string;
  fileType?: string;
}

interface Chat {
  id: string;
  contact: {name: string; lastName: string; id: string};
  lastMessage: string;
  lastMessageTime: string;
  image: string;
}

interface SpecificChat {
  contactId: string;
  messages: Message[];
}

interface ChatState {
  chats: Chat[];
  specificChats: SpecificChat[];
}

const initialState: ChatState = {
  chats: [
    {
      id: '1',
      contact: {name: 'John', lastName: 'Gonzales', id: '123456'},
      lastMessage: 'Hey, how are you?',
      lastMessageTime: '10:00 AM',
      image:
        'data:image/jpeg;base64,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',
    },
    {
      id: '2',
      contact: {name: 'Maria', lastName: 'Lopez', id: '1234567'},
      lastMessage: 'Do you want to go out tonight?',
      lastMessageTime: 'Yesterday',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEZghB-stFaphAohNqDAhEaXOWQJ9XvHKJw&s',
    },
    {
      id: '3',
      contact: {name: 'Peter', lastName: 'Sanchez', id: '12345678'},
      lastMessage: "I'll be late for the meeting",
      lastMessageTime: '2 hours ago',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAe5DoLW8HdRkJ3jJEqT6_YuKgbM5S07m2fA&s',
    },
  ],
  specificChats: [
    {
      contactId: '123456',
      messages: [
        {
          sender: 'John',
          content: 'Hey, how are you?',
          time: '10:00 AM',
        },
        {
          sender: 'You',
          content: "I'm good, thanks! How about you?",
          time: '10:05 AM',
        },
      ],
    },
    {
      contactId: '1234567',
      messages: [
        {
          sender: 'Maria',
          content: 'Do you want to go out tonight?',
          time: 'yesterday',
        },
        {
          sender: 'You',
          content: 'Sure, where do you want to go?',
          time: 'yesterday',
        },
      ],
    },
    {
      contactId: '12345678',
      messages: [
        {
          sender: 'Peter',
          content: 'Hello my friend!',
          time: '12:03',
        },
        {
          sender: 'You',
          content: 'Hi mate, how are you?',
          time: '14:05',
        },
        {
          sender: 'Peter',
          content: "I'll be late for the meeting",
          time: '17:05',
        },
      ],
    },
  ],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{contactId: string; message: Message}>,
    ) => {
      const {contactId, message} = action.payload;

      let chat = state.specificChats.find(c => c.contactId === contactId);

      if (!chat) {
        chat = {contactId, messages: []};
        state.specificChats.push(chat);
      }

      chat.messages.push(message);

      const chatIndex = state.chats.findIndex(c => c.contact.id === contactId);
      if (chatIndex !== -1) {
        state.chats[chatIndex].lastMessage = message.content;
        state.chats[chatIndex].lastMessageTime = message.time;

        const [updatedChat] = state.chats.splice(chatIndex, 1);
        state.chats.unshift(updatedChat);
      }
    },
  },
});

export const {addMessage} = chatSlice.actions;
export default chatSlice.reducer;
