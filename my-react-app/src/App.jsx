// src/App.jsx
import React, { useState, useEffect } from "react";
import "./App.css"; // Make sure to copy your CSS into this file

function App() {
  // 1. State for our users, how many to skip, and loading status
  const [users, setUsers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  // 2. The function to fetch data
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
      );
      const jsonResponse = await response.json();
      // Add new users to the existing list
      setUsers((prevUsers) => [...prevUsers, ...jsonResponse.users]);
      setSkip((prevSkip) => prevSkip + limit);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Fetch initial data when the component first mounts
  useEffect(() => {
    fetchUsers();
  }, []); // Empty array means this runs only once

  // 4. Declarative JSX: We map over the state to render the UI
  return (
    <div className="App">
      <header>
        <h1>User Profiles</h1>
      </header>
      <main>
        <div className="user-list-container">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.image} alt={user.firstName} />
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
          ))}
        </div>
        <button onClick={fetchUsers} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      </main>
    </div>
  );
}

export default App;