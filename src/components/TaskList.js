import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:3000/api/tasks');
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3000/api/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>{task.completed === 1 ? 'Yes' : 'No'}</td> {/* Show Yes/No */}
              <td>
                <Link className="btn btn-sm btn-primary mr-2" to={`/edit/${task.id}`}>Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;