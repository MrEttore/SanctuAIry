import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/user';

const initialState: User = {
  username: 'John Doe',
  email: 'john.doe@gmail.com',
  profilePicture: 'https://avatar.iran.liara.run/public/4',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername(state, action) {
      state.username = action.payload;
    },
  },
});

export const { updateUsername } = userSlice.actions;
export default userSlice.reducer;
