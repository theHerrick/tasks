import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import TodoTable from '../components/TodoTable';
import { useAuth0 } from "@auth0/auth0-react";

function Delete() {
  const [id, setId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [data, setData] = useState([]);
  const { user } = useAuth0();

  const fetchData = useCallback(async () => {
    try {
      // Fetch the data with user email included in the URL
      const response = await fetch(`http://localhost:3002/api/todos?user=${user.email}`);
      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }, [user.email]); // Include user.email as a dependency for useCallback

  const handleDelete = async () => {
    if (!id) {
      return;
    }

    const endpoint = `http://localhost:3002/api/todo/${id}`;

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccessMessage('Task deleted');
        setId('');
        fetchData();
      } else {
        console.error(`DELETE request to ${endpoint} failed`);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Include fetchData as a dependency for useEffect

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
