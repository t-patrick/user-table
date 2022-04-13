import React from 'react';
import {
  accessValueFromApiString,
  columns as selectedColumns,
} from './UserTable.utils';
import styles from './UserTable.module.css';
import { v1 as uuid } from 'uuid';

function UserRow({ user, openUserHandler }: Props) {
  return (
    <tr className={styles.tr} onClick={() => openUserHandler(user)}>
      {selectedColumns.map((col) => {
        return (
          <td className={styles.td} key={uuid()}>
            {accessValueFromApiString(user, col.apiString)}
          </td>
        );
      })}
    </tr>
  );
}

type Props = {
  user: User;
  openUserHandler: (user: User) => void;
};

export default UserRow;
