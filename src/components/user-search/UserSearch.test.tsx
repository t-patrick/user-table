import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import UserSearch from './UserSearch';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';

describe('User search', () => {
  const setup = () => {
    const mock = {
      filterString: 'filterStringDefault',
    };

    const setFilterString = jest.fn((str: string) => {
      mock.filterString = str;
    });

    const utils = render(
      <UserSearch
        filterString={mock.filterString}
        setFilterString={setFilterString as Dispatch<SetStateAction<string>>}
      />
    );

    return { utils, mock, setFilterString };
  };

  test('static elements render correctly', () => {
    const { utils } = setup();
    expect(utils.getByText(/Search/i)).toBeInTheDocument();
  });

  test('Should call setFilterString on change input text', () => {
    const { utils, mock, setFilterString } = setup();
    const input = utils.getByLabelText('Search:') as HTMLInputElement;

    expect(input.value).toEqual('filterStringDefault');

    fireEvent.change(input, { target: { value: 'John' } });
    fireEvent.change(input, { target: { value: 'John Smith' } });

    expect(mock.filterString).toEqual('John Smith');

    expect(setFilterString).toBeCalledTimes(2);
  });
});
