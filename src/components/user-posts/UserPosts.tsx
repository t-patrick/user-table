import React from 'react';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import styles from './UserPosts.module.css';

function UserPosts({
  setInPostsMode,
}: {
  setInPostsMode: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div>
      <button className={styles.button} onClick={() => setInPostsMode(false)}>
        Back to Users
      </button>
    </div>
  );
}

export default UserPosts;
