import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import TodoTable from '../components/TodoTable';
import { useAuth0 } from '@auth0/auth0-react';

function Update() {
  const [id, setId] = useState('');
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const { user } = useAuth0();

  const handleSubmit = () => {
    const url = `http://localhost:3002/api/todo/${id}?user=${user.email}`;
    const requestData = {
      title: task,
      body: description,
    };

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('PATCH request successful:', responseData);
        setMessage('Task Updated!');

        // Update the data after the task is updated
        fetch(`http://localhost:3002/api/todos?user=${user.email}`)
          .then((response) => response.json())
          .then((responseData) => {
            setData(responseData);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      })
      .catch((error) => {
        console.error('Error while making PATCH request:', error);
      });
  };

  useEffect(() => {
    // Fetch the data with user email included in the URL
    fetch(`http://localhost:3002/api/todos?user=${user.email}`)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user.email]); // Include user.email as a dependency

  return (
    <>
      <div>
        <h2>Update</h2>
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

          <Button variant="primary" type="button" onClick={handleSubmit}>
            Update
          </Button>
          {message && <p>{message}</p>}
        </Form>
      </div>
      <div>
        <TodoTable data={data} />
      </div>
    </>
  );
}

export default Update;
