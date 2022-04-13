import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserTableProps } from '../../proptypes';
import { fetchPosts } from '../../state/posts';
import { RootState } from '../../state/store';
import UserRow from './UserRow';
import styles from './UserTable.module.css';
import {
  columns as selectedColumns,
  filterSearchedUsers,
} from './UserTable.utils';
import { v1 as uuid } from 'uuid';

function UserTable({ setInPostsMode, filterString }: UserTableProps) {
  const dispatch = useDispatch();
  const selectUsers = (state: RootState) => {
    return filterSearchedUsers(state.users, filterString);
  };
  const users = useSelector<RootState>(selectUsers) as Array<User>;

  const openUserHandler = async (user: User) => {
    dispatch(fetchPosts(user));
    setInPostsMode(true);
    window.scrollTo(0, 0);
  };

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          {selectedColumns.map((col) => {
            return (
              <th className={styles.th} key={uuid()}>
                {col.columnName}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user) => {
            return (
              <UserRow
                user={user}
                key={uuid()}
                openUserHandler={openUserHandler}
              />
            );
          })}
      </tbody>
    </table>
  );
}

export default UserTable;
