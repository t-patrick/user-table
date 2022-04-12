import React from 'react';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import { useState } from 'react';
import styles from './usersearch.module.css';

function UserSearch({
  filterString,
  setFilterString,
}: {
  filterString: string;
  setFilterString: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className={styles.container}>
      <h2>Search User:</h2>
      <input
        type="text"
        className={styles.input}
        value={filterString}
        onChange={(e) => setFilterString(e.target.value)}
      ></input>
    </div>
  );
}

export default UserSearch;
