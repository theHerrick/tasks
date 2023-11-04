import React, { useState, useEffect } from 'react';
import TodoTable from '../components/TodoTable';
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const [data, setData] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    const apiUrl = `http://localhost:3002/api/todos?user=${user.email}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user.email]);

  return (
    <div>
      <h2>Todo</h2>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <TodoTable data={data} />
    </div>
  );
}

export default Home;
