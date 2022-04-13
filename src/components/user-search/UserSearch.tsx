import React from 'react';
import { UserSearchProps } from '../../proptypes';
import styles from './usersearch.module.css';

function UserSearch({ filterString, setFilterString }: UserSearchProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="input">Search:</label>
      <input
        type="text"
        id="input"
        className={styles.input}
        value={filterString}
        onChange={(e) => setFilterString(e.target.value)}
      ></input>
    </div>
  );
}

export default UserSearch;
