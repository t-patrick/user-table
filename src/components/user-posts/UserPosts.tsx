import React from 'react';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import { useAppSelector } from '../../state/hooks';
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
  const posts: Posts = useAppSelector((state) => state.posts);

  return (
    <div>
      <button className={styles.button} onClick={() => setInPostsMode(false)}>
        Back to Users
      </button>
      <h2>{posts.user && posts.user.name}'s' posts:</h2>
      {posts.posts && posts.posts.map((post) => <p>{post.body}</p>)}
    </div>
  );
}

export default UserPosts;
