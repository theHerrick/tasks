import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Button, Table } from 'react-bootstrap';
import NavBar from './components/NavBar';

const API_ENDPOINT = 'http://localhost:3002/api/tasks';

function App() {
  const [data, setData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(API_ENDPOINT, {
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
    setEditingItemId(id);
    const editedItem = data.find((item) => item._id === id);
    setEditedTitle(editedItem.title);
    setEditedDescription(editedItem.description);
  };

  const handleSaveEdit = async () => {
    try {
      await fetch(API_ENDPOINT, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: editingItemId,
          title: editedTitle,
          description: editedDescription,
        }),
      });

      setEditingItemId(null);
      setEditedTitle('');
      setEditedDescription('');
      fetchData();
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditedTitle('');
    setEditedDescription('');
  };

  const handleAddTask = async () => {
    try {
      const response = await fetch(API_ENDPOINT, {
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

      setTitle('');
      setDescription('');
      fetchData();
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  return (
    <div className="App">
      <NavBar />
      <div className="container">
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

        <h2>Current Tasks</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>
                  {editingItemId === item._id ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  ) : (
                    item.title
                  )}
                </td>
                <td>
                  {editingItemId === item._id ? (
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td>
                  {editingItemId === item._id ? (
                    <>
                      <Button variant="success" onClick={handleSaveEdit}>
                        Save
                      </Button>{' '}
                      <Button variant="secondary" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="info" onClick={() => handleEdit(item._id)}>
                        Edit
                      </Button>{' '}
                      <Button variant="danger" onClick={() => handleDelete(item._id)}>
                        Delete
                      </Button>
                    </>
                  )}
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
