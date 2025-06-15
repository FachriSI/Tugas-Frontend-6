import '../Styles/tasks.css';
import React, { useState } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Belajar React', completed: false },
    { id: 2, title: 'Implementasi Authentication', completed: true },
    { id: 3, title: 'Deploy Aplikasi', completed: false }
  ]);

  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask,
        completed: false
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setEditingId(id);
      setEditedTitle(taskToEdit.title);
    }
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title: editedTitle } : task
    ));
    setEditingId(null);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tasks-container">
      <h1>My Tasks</h1>
      <p>Total Tugas: {filteredTasks.length}</p>

      <form onSubmit={addTask} className="add-task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
          className="task-input"
        />
        <button type="submit">Add Task</button>
      </form>

      <input
        type="text"
        placeholder="Cari tugas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="task-input"
        style={{ marginBottom: '1rem' }}
      />

      <div className="tasks-list">
        {filteredTasks.map(task => (
          <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            {editingId === task.id ? (
              <form onSubmit={(e) => handleEditSubmit(e, task.id)} style={{ flexGrow: 1 }}>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  autoFocus
                  className="task-input"
                />
              </form>
            ) : (
              <span onClick={() => toggleTask(task.id)} onDoubleClick={() => handleEdit(task.id)}>
                {task.title}
              </span>
            )}
            <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
