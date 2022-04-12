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

function App() {
  const [inPostsMode, setInPostsMode] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const [filterString, setFilterString] = useState<string>('');
  const [users, setUsers] = useState<Array<User>>([] as Array<User>);
  const [filteredUsers, setFilteredUsers] = useState<Array<User>>(
    [] as Array<User>
  );

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const users = await response.json();

      setUsers(users);
      setFilteredUsers(users);
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (filterString === '') {
      setFilteredUsers(users);
      return;
    }
    const regex = new RegExp('.*' + filterString + '.*', 'i');
    const filtered = users.filter((user) => regex.test(user.name));

    setFilteredUsers(filtered);
  }, [users, filterString]);

  // TODO setup redux
  // There will be a current user posts
  // Put this in an async thunk.

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
