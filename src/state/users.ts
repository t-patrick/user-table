import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/userAPI';

export const users = createSlice({
  name: 'user',
  initialState: [] as Array<User>,
  reducers: {
    setUsers: (state, action: PayloadAction<Array<User>>) => {
      return (state = action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
});

export const fetchUsers = createAsyncThunk<Array<User>>(
  'users/fetchUsers',
  async () => {
    try {
      const users = await getUsers();
      return users;
    } catch (e: any) {
      console.log(e.toString());
    }
  }
);
