import React from 'react';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import styles from './UserPosts.module.css';

/* 
  Needs Posts type: Access to all user info, and all user posts.
  This could also be achieved by react router, passing the object as a param;
*/

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
