import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './UserTable.module.css';

const mockColumns: Array<ColumnType> = [
  {
    columnName: 'Name',
    apiKey: 'name',
  },
  {
    columnName: 'Email',
    apiKey: 'email',
  },
  {
    columnName: 'City',
    apiKey: 'address.city',
  },
  {
    columnName: 'Company',
    apiKey: 'company.name',
  },
];

function UserTable() {
  const [selectedColumns, setSelectedColumns] =
    useState<Array<ColumnType>>(mockColumns);

  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const users = await response.json();

      setUsers(users);
    };

    getUsers();
  }, []);

  const accessValueFromApiString = (user: User, apiString: string) => {
    if (!apiString.includes('.')) return user[apiString as keyof User];

    const arr = apiString.split('.');

    let val: any = user;

    for (const key of arr) {
      val = val[key];
    }

    return val;
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
                  return <td>{accessValueFromApiString(user, col.apiKey)}</td>;
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default UserTable;
