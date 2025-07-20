import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/user';

const initialState: User = {
    username: 'John Doe',
    email: 'john.doe@sanctuairy.com',
    profilePicture: 'https://api.dicebear.com/9.x/initials/svg?seed=John%20Doe',
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
