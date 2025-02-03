import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Profile {
  name: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  photo: string;
  status: 'Online' | 'Offline';
  lastSeen: string;
  Id: string;
}

interface UserProfileState {
  profile: Profile;
  loading: boolean;
}

const initialState: UserProfileState = {
  profile: {} as Profile,
  loading: false,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },
    changePhoto: (state, action: PayloadAction<string>) => {
      state.profile.photo = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearUserProfile: state => {
      state.profile = {} as Profile;
    },
    changeStatus: (state, action: PayloadAction<'Online' | 'Offline'>) => {
      state.profile.status = action.payload;
    },
  },
});

export const {
  setProfile,
  setLoading,
  changePhoto,
  clearUserProfile,
  changeStatus,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
