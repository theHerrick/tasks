import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todos');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tasks</h1>
        <div>
      {data.length ? (
        data.map((item) => (
          <div key={item.id}>
            <p>{item.task}</p>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
      </header>
    </div>
  );
}

export default App;
