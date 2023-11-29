import React, { useState, useEffect } from 'react';
import "./todo.css"
import { FaEdit, FaPlusCircle, FaTrash} from 'react-icons/fa'
import axios from 'axios';
const TodoApp = () => {
  const [data, setData] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filterCompleted, setFilterCompleted] = useState(false);

  //  Initial data to populate the list of tasks from the API
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users/1/todos").then((res)=>{
        setData(res.data)
    })
  }, []);

  // Add a new task function
  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTodoTask = {
        userId: 1,
        id: data.length + 1,
        title: newTask,
        completed: false,
      };

      setData([...data, newTodoTask]);
      setNewTask('');
    }
  };

  // Complete task Functionality
  const completeTask = (taskId) => {
    setData((prevTodos) =>
      prevTodos.map((todoTask) =>
        todoTask.id === taskId ? { ...todoTask, completed: !todoTask.completed } : todoTask
      )
    );
  };

  // Edit task Functionality
  const editTask = (taskId, newTitle) => {
    if (newTitle.length > 2) {
      setData((prevTodos) =>
        prevTodos.map((todoTask) =>
          todoTask.id === taskId ? { ...todoTask, title: newTitle } : todoTask
        )
      );
    } else {
     window.alert("Tittle should not be empty please enter the task")
    }
  };
  

  // Delete a task
  const deleteTask = (taskId) => {
    setData((prevTodos) => prevTodos.filter((todoTask) => todoTask.id !== taskId));
  };

  // Filter tasks based on completion status
  const filteredTodos = filterCompleted
    ? data.filter((todoTask) => todoTask.completed)
    : data;

  return (
    <div className='todo-list'>
       <header>
          <div>
              <h1>TODO APP LIST</h1>
          </div>
      </header>

      {/* Input to add new tasks */}
      <div className='enter-task-new' >
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}><FaPlusCircle/></button>
      </div>
      <hr/>


      {/* Filter buttons */}
      <div className='enter-task'>
        <button onClick={() => setFilterCompleted(false)}>
          <h3>See All Tasks</h3>
        </button>
        <button onClick={() => setFilterCompleted(true)}>
         <h3>See Completed Tasks</h3>
        </button>
      </div>
      <div className='page-body'>

      {/* List of tasks */}
      <ol type="1">
        {filteredTodos.map((todo) => (
           
          <li key={todo.id}>
             <div className='allTask'>
            <div>
            <h2 className='pending'
              style={{ color: todo.completed ? 'green' : 'none',
            textDecoration:todo.completed? 'line-through': 'none' }}
              onClick={() => completeTask(todo.id)}>
              {todo.title}
            </h2>
            </div>
            <div className='func-btn' >
              <button className='edit-btn' onClick={() => editTask(todo.id, prompt('Edit task:', todo.title))}>
              <FaEdit/>
            </button>
            <button className='del-btn' onClick={() => deleteTask(todo.id)}><FaTrash/></button>
            </div>
            </div>
          </li>
        ))}
      </ol>
      </div>
    </div>
  );
};

export default TodoApp;
