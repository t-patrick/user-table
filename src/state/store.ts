import {
  createSlice,
  PayloadAction,
  configureStore,
  createAsyncThunk,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (thunkAPI) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    return users;
  }
);

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (user: User) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
    );
    const posts = await response.json();
    return {
      user,
      posts,
    };
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

const reducer = {
  users: users.reducer,
  posts: posts.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
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
