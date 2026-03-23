import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    completed: false
  });

  // Load task if editing
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/tasks/${id}`).then(res => {
        setTask({
          ...res.data,
          completed: res.data.completed === 1 // convert 0/1 to boolean //not working for some reason
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    //convert completed boolean to 1/0 for the backend?
    const payload = {
      ...task,
      completed: task.completed ? 1 : 0
    };
  
    if (id) {
      await axios.put(`http://localhost:3000/api/tasks/${id}`, payload);
    } else {
      await axios.post('http://localhost:3000/api/tasks', payload);
    }
  
    navigate('/');
  };

  return (
    <div>
      <h2>{id ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate.split('T')[0]}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="completed"
            checked={task.completed}
            onChange={handleChange}
            className="form-check-input"
          />
          <label className="form-check-label">Completed</label>
        </div>
        <button type="submit" className="btn btn-success">
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;