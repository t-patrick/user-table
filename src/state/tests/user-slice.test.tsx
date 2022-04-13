import { fetchUsers, users } from '../users';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Dispatch } from '@reduxjs/toolkit';
import { userMocks as mocks } from './mocks';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('Initial state is an empty array', () => {
  expect(users.getInitialState()).toEqual([]);
});

test('set user action creator returns correct action', () => {
  const expectedAction = {
    type: 'user/setUsers',
    payload: [],
  };
  expect(users.actions.setUsers([])).toEqual(expectedAction);
});

test('setUsers reducer returns correct state', () => {
  const returnedState = users.reducer([], users.actions.setUsers([mocks.user]));
  expect(returnedState).not.toEqual([]);
  expect(returnedState).toEqual([mocks.user]);
});

test('action dispatches to mock store correctly', () => {
  const expectedAction = {
    type: 'user/setUsers',
    payload: [mocks.user, mocks.user2],
  };

  const store = mockStore({} as Array<User>);
  const dispatch = store.dispatch as Dispatch<any>;
  dispatch(users.actions.setUsers([mocks.user, mocks.user2]));
  const actions = store.getActions();
  expect(actions[0]).toEqual(expectedAction);
});

describe('Async thunk functions correctly', () => {
  const defaultFetch = global.fetch;

  afterAll(() => {
    global.fetch = defaultFetch;
  });

  test('fetchUsers async thunk should pass array of users on fulfilled', async () => {
    (global.fetch as any) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([mocks.user]),
      })
    );
    const action = fetchUsers();

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await action(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0].type).toEqual('users/fetchUsers/pending');
    expect(dispatch.mock.calls[1][0].type).toEqual(
      'users/fetchUsers/fulfilled'
    );
    expect(result.payload).toEqual([mocks.user]);
    expect(result.type).toEqual('users/fetchUsers/fulfilled');
  });
});
