import React, { useState, useEffect } from 'react';
import TodoTable from '../components/TodoTable';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make an API call here to fetch the data
    fetch('http://localhost:3002/api/todos')
      .then((response) => response.json())
      .then((responseData) => {
        // Update the state with the data from the API response
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Todo</h2>
      <TodoTable data={data} />
    </div>
  );
}

export default Home;
