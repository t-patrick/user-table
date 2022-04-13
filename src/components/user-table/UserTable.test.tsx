import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import UserTable from './UserTable';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import { users } from '../../state/users';
import { userMocks } from '../../state/tests/mocks';
import { columns } from './UserTable.utils';

describe('Table', () => {
  const setup = () => {
    store.dispatch(users.actions.setUsers([userMocks.user, userMocks.user2]));

    const mock = {
      filterString: '',
      inPostsMode: false,
    };

    const setInPostsModeMock = jest.fn((bool: boolean) => {
      mock.inPostsMode = bool;
    });

    const utils = render(
      <Provider store={store}>
        <UserTable
          filterString={mock.filterString}
          setInPostsMode={
            setInPostsModeMock as Dispatch<SetStateAction<boolean>>
          }
        />
      </Provider>
    );

    return { utils, mock, setInPostsModeMock };
  };

  //Tests

  test('should render table rows correctly', () => {
    const { utils } = setup();

    const rows = utils.getAllByRole('row');

    // 3 rows: 1 header and 2 user rows
    expect(rows).toHaveLength(3);
  });

  test('should render table columns correctly', () => {
    const { utils } = setup();

    const cells = utils.getAllByRole('cell');

    // 4 rows, 2 mock users, 4 * 2 = 8
    expect(cells).toHaveLength(columns.length * 2);
  });
});
