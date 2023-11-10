import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { Table, Button } from 'react-bootstrap';
import AddTask from './components/AddTask';

function App() {
  const [data, setData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

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
    setEditingItemId(id);
    const editedItem = data.find((item) => item._id === id);
    setEditedTitle(editedItem.title);
    setEditedDescription(editedItem.description);
  };

  const handleSaveEdit = async () => {
    try {
      // Send PATCH request to update the item with the edited data
      await fetch(`http://localhost:3002/api/tasks`, {
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

      // Reset editing state and refresh the table data
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

  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <AddTask />
        <h2>Current Tasks</h2>
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
                      <Button variant="danger" onClick={() => handleDelete(item._id)}>
                        Delete
                      </Button>{' '}
                      <Button variant="info" onClick={() => handleEdit(item._id)}>
                        Edit
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
