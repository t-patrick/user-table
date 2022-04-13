import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserTableProps } from '../../proptypes';
import { fetchPosts } from '../../state/posts';
import { RootState } from '../../state/store';
import styles from './UserTable.module.css';
import {
  accessValueFromApiString,
  columns as selectedColumns,
  filterSearchedUsers,
} from './UserTable.utils';

function UserTable({ setInPostsMode, filterString }: UserTableProps) {
  const dispatch = useDispatch();
  const selectUsers = (state: RootState) => {
    return filterSearchedUsers(state.users, filterString);
  };
  const users = useSelector<RootState>(selectUsers) as Array<User>;

  const openUserHandler = (user: User) => () => {
    dispatch(fetchPosts(user));
    setInPostsMode(true);
  };

  return (
    <table className={styles.table}>
      <thead>
        {selectedColumns.map((col) => {
          return <th>{col.columnName}</th>;
        })}
      </thead>
      <tbody>
        {users &&
          users.map((user) => {
            return (
              <tr>
                {selectedColumns.map((col) => {
                  return (
                    <td onClick={openUserHandler(user)}>
                      {accessValueFromApiString(user, col.apiString)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default UserTable;
