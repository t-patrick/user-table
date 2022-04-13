import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import UserTable from './components/user-table/UserTable';
import styles from './App.module.css';
import { useState } from 'react';
import UserPosts from './components/user-posts/UserPosts';
import UserSearch from './components/user-search/UserSearch';
import { useEffect } from 'react';
import { AppThunk, fetchUsers } from './state/store';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { useDispatch } from 'react-redux';

function App() {
  const [inPostsMode, setInPostsMode] = useState<boolean>(false);
  const [filterString, setFilterString] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<Array<User>>(
    [] as Array<User>
  );

  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    filterString === ''
      ? setFilteredUsers(users)
      : setFilteredUsers(filterUsers());
  }, [users, filterString]);

  const filterUsers = () => {
    const regex = new RegExp('.*' + filterString + '.*', 'i');
    return users.filter((user) => regex.test(user.name));
  };

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
            <UserTable setInPostsMode={setInPostsMode} users={filteredUsers} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
