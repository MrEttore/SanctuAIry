import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
        setUser(state, action: PayloadAction<User>) {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.profilePicture = action.payload.profilePicture;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
