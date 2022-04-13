import { render } from '@testing-library/react';
import { postMocks } from '../../state/tests/mocks';
import UserPost from './UserPost';

describe('User Post', () => {
  const setup = () => {
    const post = postMocks[0];

    const utils = render(<UserPost post={post} />);

    return { utils };
  };

  test('cells display correctly', () => {
    const { utils } = setup();

    const cells = utils.getAllByRole('cell');

    expect(cells[0].textContent).toBe(postMocks[0].title);
    expect(cells[1].textContent).toBe(postMocks[0].body);
  });
});
