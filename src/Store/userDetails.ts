import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserDetails {
  isLoggedIn: boolean;
}
const initialState: UserDetails = {
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {updateUser} = userSlice.actions;
