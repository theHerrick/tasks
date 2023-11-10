import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error('Error adding task');
      }

      // Optionally, you can handle success here, e.g., show a success message, reset the form, etc.

    } catch (error) {
      console.error('Error adding task:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <>
      <h2>New Task</h2>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
        <Form.Control
          aria-label="Title"
          aria-describedby="basic-addon1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

      <Button variant="success" onClick={handleAddTask}>
        Add
      </Button>{' '}
    </>
  );
}

export default AddTask;
