import { fetchPosts, posts } from '../posts';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Dispatch } from '@reduxjs/toolkit';
import { postsMocks, userMocks } from './mocks';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('Initial state is an empty array', () => {
  expect(posts.getInitialState()).toEqual({});
});

test('setPosts action creator returns correct action', () => {
  const expectedAction = {
    type: 'posts/setPosts',
    payload: postsMocks,
  };
  expect(posts.actions.setPosts(postsMocks)).toEqual(expectedAction);
});

test('setPosts reducer returns correct state', () => {
  const oldState = {} as Posts;
  const returnedState = posts.reducer(
    oldState,
    posts.actions.setPosts(postsMocks)
  );
  expect(returnedState).not.toEqual(oldState);
  expect(returnedState).toEqual(postsMocks);
});

test('action dispatches to mock store correctly', () => {
  const expectedAction = {
    type: 'posts/setPosts',
    payload: postsMocks,
  };

  const store = mockStore({} as Posts);
  const dispatch = store.dispatch as Dispatch<any>;
  dispatch(posts.actions.setPosts(postsMocks));
  const actions = store.getActions();
  expect(actions[0]).toEqual(expectedAction);
});

describe('Async thunk functions correctly', () => {
  const defaultFetch = global.fetch;

  beforeEach(() => {
    (global.fetch as any) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(postsMocks.posts),
      })
    );
  });

  afterAll(() => {
    global.fetch = defaultFetch;
  });

  test('thunk should receive Array of posts from fetch, and should return a Posts object', async () => {
    const action = fetchPosts(userMocks.user);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await action(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0].type).toEqual('posts/fetchPosts/pending');
    expect(dispatch.mock.calls[1][0].type).toEqual(
      'posts/fetchPosts/fulfilled'
    );
    expect(result.payload).toEqual(postsMocks);
    expect(result.type).toEqual('posts/fetchPosts/fulfilled');
  });
});
