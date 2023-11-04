// src/HttpRequest.js
import React, { useState, useEffect } from 'react';

function HttpRequest() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Replace 'https://api.example.com/your-endpoint' with your API endpoint.
    fetch('http://localhost:3002/api/data')
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>HTTP Request Example</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default HttpRequest;
