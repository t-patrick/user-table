import { fetchPosts } from '../state/posts';
import { userMocks } from '../state/tests/mocks';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Dispatch } from '@reduxjs/toolkit';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetch posts', () => {
  beforeEach(() => {
    (fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );
  });

  test('fetch should be called with the correct query string', async () => {
    const user = userMocks.user;

    const store = mockStore({} as Posts);
    const dispatch = store.dispatch as Dispatch<any>;
    dispatch(fetchPosts(user));

    const mockFetch = fetch as jest.Mock;

    expect(mockFetch.mock.calls[0][0]).toEqual(
      'https://jsonplaceholder.typicode.com/posts?userId=2'
    );
    expect(mockFetch.mock.calls[0][0]).not.toEqual(
      'https://jsonplaceholder.typicode.com/posts?userId='
    );
  });
});
