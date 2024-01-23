/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IAuth } from '@/models/user';

interface IInitialState {
  user: IAuth;
}

const initialState: IInitialState = {
  user: {
    id: '',
    firstname: '',
    lastname: '',
    username: '',
    gender: null,
    phoneNumber: '',
    email: '',
    birthday: null || '',
    token: null || '',
    apiLogin: null || '',
    role: '',
    isBlocked: false,
    permissions: {
      actions: {},
      routes: {}
    }
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
