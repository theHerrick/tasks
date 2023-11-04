import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import TodoTable from '../components/TodoTable';

function Delete() {
  const [id, setId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/todos');
      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleDelete = async () => {
    if (!id) {
      // Don't send a DELETE request if ID is empty
      return;
    }

    const endpoint = `http://localhost:3002/api/todo/${id}`;

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle a successful response
        setSuccessMessage('Task deleted');
        setId(''); // Clear the input field
        // Refresh data after a successful delete
        fetchData();
      } else {
        console.error(`DELETE request to ${endpoint} failed`);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially when the component mounts
  }, []);

  return (
    <>
      <div>
        <h2>Delete Task</h2>
        <Form>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">ID</InputGroup.Text>
            <Form.Control
              aria-label="ID"
              aria-describedby="basic-addon1"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </InputGroup>

          <Button variant="primary" type="button" onClick={handleDelete}>
            Delete
          </Button>

          {successMessage && <div className="text-success">{successMessage}</div>}
        </Form>
      </div>
      <div>
        <TodoTable data={data} />
      </div>
    </>
  );
}

export default Delete;
