import React from 'react';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './UserTable.module.css';
import { columns } from './UserTable.utils';

// TODO Set up prop types

function UserTable({
  users,
  setInPostsMode,
}: {
  users: Array<User>;
  setInPostsMode: Dispatch<SetStateAction<boolean>>;
}) {
  const [selectedColumns, setSelectedColumns] =
    useState<Array<ColumnType>>(columns);

  const accessValueFromApiString = (user: User, apiString: string) => {
    if (!apiString.includes('.')) return user[apiString as keyof User];

    const arr = apiString.split('.');

    let val: any = user;

    for (const key of arr) {
      val = val[key];
    }

    return val;
  };

  const openUser = () => {
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
                    <td onClick={openUser}>
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
