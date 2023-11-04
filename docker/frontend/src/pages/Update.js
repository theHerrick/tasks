// src/About.js
import React, { useEffect, useState} from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import TodoTable from '../components/TodoTable';

function Update() {

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
    <>
    <div>
      <h2>Update</h2>
        <Form>
        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">ID</InputGroup.Text>
            <Form.Control
              aria-label="ID"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Task</InputGroup.Text>
            <Form.Control
              aria-label="Task"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon2">Description</InputGroup.Text>
            <Form.Control
              aria-label="Description"
              aria-describedby="basic-addon2"
            />
          </InputGroup>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          </Form>
    </div>
    <div>
      <TodoTable data={data} />
    </div>
    </>
  );
}

export default Update;
