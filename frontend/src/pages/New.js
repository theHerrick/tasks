import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import TodoTable from '../components/TodoTable';

function New() {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [data, setData] = useState([]);
  const { user } = useAuth0();

  const apiBaseUrl = 'http://localhost:3002/api';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title: task,
      body: description,
      user: user.email
    };

    try {
      const response = await fetch(`${apiBaseUrl}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setSuccessMessage('New task added!');
        setTask('');
        setDescription('');

        try {
          const response = await fetch(`${apiBaseUrl}/todos?user=${user.email}`);
          if (response.ok) {
            const responseData = await response.json();
            setData(responseData);
          } else {
            console.error('Error fetching data after adding a new task');
          }
        } catch (error) {
          console.error('Network error:', error);
        }
      } else {
        console.error('POST request failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    fetch(`${apiBaseUrl}/todos?user=${user.email}`)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user.email]);

  return (
    <>
      <div>
        <h2>New Task</h2>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Task</InputGroup.Text>
            <Form.Control
              aria-label="Task"
              aria-describedby="basic-addon1"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon2">Description</InputGroup.Text>
            <Form.Control
              aria-label="Description"
              aria-describedby="basic-addon2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputGroup>

          <Button variant="primary" type="submit">
            Create
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

export default New;
