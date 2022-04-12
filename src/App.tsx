import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import UserTable from "./components/user-table/UserTable";
import styles from "./App.module.css";

function App() {
  return (
    <div className="container">
      <Navbar />
      <div className={styles.main}>
        <UserTable />
      </div>
    </div>
  );
}

export default App;
