import { SetStateAction } from 'react';
import { Dispatch } from 'react';

export type UserTableProps = {
  users: Array<User>;
  setInPostsMode: Dispatch<SetStateAction<boolean>>;
};

export type UserPostsProps = {
  setInPostsMode: Dispatch<SetStateAction<boolean>>;
};
