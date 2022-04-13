import { Dispatch } from 'react';
import {
  createSlice,
  PayloadAction,
  configureStore,
  createAsyncThunk,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';

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

export const fetchPosts = createAsyncThunk<Posts, User>(
  'posts/fetchPosts',
  async (user: User, thunkApi) => {
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

const users = createSlice({
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

const posts = createSlice({
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

const reducer = combineReducers({
  users: users.reducer,
  posts: posts.reducer,
});

export type RootState = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer,
});
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

/* 
  Quick plan for reducers: 
  Set users
  set userPosts
  OPTIONAL: set filtered users
  OPTIONAL: set filter string
*/
