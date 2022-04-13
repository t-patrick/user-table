import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const users = await response.json();
      return users;
    } catch (e: any) {
      console.log(e.toString());
    }
  }
);
