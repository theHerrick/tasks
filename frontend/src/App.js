import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { Table, Button } from 'react-bootstrap';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/tasks');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3002/api/tasks/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: id }),
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (id) => {
    // Implement your edit logic here
    console.log(`Edit button clicked for item with ID ${id}`);
  };

  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <h1>Hello, World!</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>{' '}
                  <Button variant="info" onClick={() => handleEdit(item._id)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
