import { SetStateAction } from 'react';
import { Dispatch } from 'react';

export type UserTableProps = {
  setInPostsMode: Dispatch<SetStateAction<boolean>>;
  filterString: string;
};

export type UserPostsProps = {
  setInPostsMode: Dispatch<SetStateAction<boolean>>;
};

export type UserSearchProps = {
  filterString: string;
  setFilterString: Dispatch<SetStateAction<string>>;
};
