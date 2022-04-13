import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import UserTable from './components/user-table/UserTable';
import styles from './App.module.css';
import { useState } from 'react';
import UserPosts from './components/user-posts/UserPosts';
import UserSearch from './components/user-search/UserSearch';
import { useEffect } from 'react';
import { useAppDispatch } from './state/hooks';
import { fetchUsers, users } from './state/users';

function App() {
  const [inPostsMode, setInPostsMode] = useState<boolean>(false);
  const [filterString, setFilterString] = useState<string>('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="container">
      <Navbar />
      <div className={styles.main}>
        {inPostsMode ? (
          <UserPosts setInPostsMode={setInPostsMode} />
        ) : (
          <>
            <UserSearch
              filterString={filterString}
              setFilterString={setFilterString}
            />
            <UserTable
              setInPostsMode={setInPostsMode}
              filterString={filterString}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
