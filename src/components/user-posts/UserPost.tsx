import React from 'react';
import styles from './UserPosts.module.css';

function UserPost({ post }: { post: Post }) {
  return (
    <tr className={styles.post}>
      <td className={styles.title}>{post.title}</td>
      <td className={styles.body}>{post.body}</td>
    </tr>
  );
}

export default UserPost;
