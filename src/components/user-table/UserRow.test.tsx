import { fireEvent, render } from '@testing-library/react';
import { userMocks } from '../../state/tests/mocks';
import UserRow from './UserRow';
import { accessValueFromApiString, columns } from './UserTable.utils';

describe('User Row', () => {
  const setup = () => {
    const openUserHandler = jest.fn(() => {});

    const utils = render(
      <UserRow openUserHandler={openUserHandler} user={userMocks.user} />
    );

    return { utils, openUserHandler };
  };

  test('accessValueFromApiString should be return correct values', () => {
    const user = userMocks.user;
    expect(accessValueFromApiString(user, 'name')).toBe('Ervin Howell');
    expect(accessValueFromApiString(user, 'website')).toBe('anastasia.net');
    expect(accessValueFromApiString(user, 'company.name')).toBe('Deckow-Crist');
    expect(accessValueFromApiString(user, 'address.street')).toBe(
      'Victor Plains'
    );
  });

  test('Should have correct number of columns', () => {
    const { utils } = setup();
    const cells = utils.getAllByRole('cell');

    expect(cells).toHaveLength(columns.length);
  });

  test("Cells' content should render correctly", () => {
    const { utils } = setup();
    const cells = utils.getAllByRole('cell');

    expect(cells[0].textContent).toBe('Ervin Howell');
  });

  test('Click handler functions correctly', () => {
    const { utils, openUserHandler } = setup();
    const rows = utils.getAllByRole('row');
    fireEvent.click(rows[0]);

    expect(openUserHandler).toBeCalledTimes(1);
  });
});
