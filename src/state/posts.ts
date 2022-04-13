import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export const posts = createSlice({
  name: 'posts',
  initialState: {} as Posts,
  reducers: {
    setPosts: (state, action: PayloadAction<Posts>) => {
      return (state = action.payload);
    },
    deletePosts: (state) => {
      return (state = {} as Posts);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
});

export const fetchPosts = createAsyncThunk<Posts, User>(
  'posts/fetchPosts',
  async (user: User) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
    );
    const posts = await response.json();
    return {
      user,
      posts,
    } as Posts;
  }
);
