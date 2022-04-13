import { render } from '@testing-library/react';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import { Provider } from 'react-redux';
import { posts } from '../../state/posts';
import { store } from '../../state/store';
import { postsMocks } from '../../state/tests/mocks';
import UserPosts from './UserPosts';

describe('Posts', () => {
  const setup = () => {
    store.dispatch(posts.actions.setPosts(postsMocks));

    const setInPostsMode = jest.fn((bool: boolean) => {});

    const utils = render(
      <Provider store={store}>
        <UserPosts
          setInPostsMode={setInPostsMode as Dispatch<SetStateAction<boolean>>}
        />
      </Provider>
    );

    return { utils };
  };

  test('Displays the correct amount of posts', () => {
    const { utils } = setup();

    const rows = utils.getAllByRole('row');

    expect(rows).toHaveLength(postsMocks.posts.length + 1);
  });

  test('Displays user name correctly', () => {
    const { utils } = setup();

    const header = utils.getByTestId('user-name');

    expect(header).toHaveTextContent("Ervin Howell's posts");
  });
});
