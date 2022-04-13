import React from 'react';
import { UserPostsProps } from '../../proptypes';
import { useAppSelector } from '../../state/hooks';
import UserPost from './UserPost';
import styles from './UserPosts.module.css';
import { v1 as uuid } from 'uuid';

function UserPosts({ setInPostsMode }: UserPostsProps) {
  const posts: Posts = useAppSelector((state) => state.posts);

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => setInPostsMode(false)}>
        Back to User List
      </button>
      <h2 className={styles.header} data-testid="user-name">
        {posts.user && posts.user.name}'s posts:
      </h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.posts &&
            posts.posts.map((post) => <UserPost key={uuid()} post={post} />)}
        </tbody>
      </table>
    </div>
  );
}

export default UserPosts;
