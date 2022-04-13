import React from 'react';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserTableProps } from '../../proptypes';
import { fetchPosts } from '../../state/store';
import styles from './UserTable.module.css';
import { accessValueFromApiString, columns } from './UserTable.utils';

// TODO Set up prop types

function UserTable({ users, setInPostsMode }: UserTableProps) {
  const [selectedColumns, setSelectedColumns] =
    useState<Array<ColumnType>>(columns);

  const dispatch = useDispatch();

  const openUser = (user: User) => () => {
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
                    <td onClick={openUser(user)}>
                      {accessValueFromApiString(user, col.apiKey)}
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
