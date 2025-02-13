import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css';

// Main Todo Component
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [bgColor, setBgColor] = useState('#f4f7f6'); // Default background color

  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos from the API
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/todos/');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Add a new todo
  const addTodo = async () => {
    if (newTodo.title === '' || newTodo.description === '') {
      alert('Please provide both title and description');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/todos/', newTodo);
      setNewTodo({ title: '', description: '' });
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/ `);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Handle background color change
  const handleBgColorChange = (e) => {
    setBgColor(e.target.value);
  };

  return (
    <div className="todo-container" style={{ backgroundColor: bgColor }}>
      <h1 className="header">Todo App</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          className="input"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          className="input"
        />
        <button onClick={addTodo} className="button">Add Todo</button>
      </div>

      <div className="color-picker-container">
        <label className="color-label">Choose Background Color: </label>
        <input
          type="color"
          value={bgColor}
          onChange={handleBgColorChange}
          className="color-picker"
        />
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div className="todo-info">
              <h3 className="todo-title">{todo.title}</h3>
              <p className="todo-description">{todo.description}</p>
            </div>
            <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;

// Adding CSS styling directly within the component using 'styled-components' or external CSS
