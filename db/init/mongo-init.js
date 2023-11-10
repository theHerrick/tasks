db = db.getSiblingDB('tasks');

db.createCollection('tasks');

db.tasks.insertMany([
 {
    title: 'First Task',
    description: 'Description of second task',
  },
  {
    title: 'Second Task',
    description: 'Description of second task',
  }
]);

db.createUser(
    {
      user: "tasks",
      pwd:  "password",
      roles: [ { role: "readWrite", db: "tasks" }]
    }
  )