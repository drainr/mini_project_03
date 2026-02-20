import { useRef, useState, useEffect } from 'react'
import './App.css'
import { createTheme } from '@mui/material/styles';
import { darkred, grey } from '@mui/material/colors';

export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: grey[500],
      },
      secondary: {
        main: darkred[500],
      },
    }
  });

  const [tasks, setTasks] = useState([]);
  const taskTitle = useRef('');
  const taskDescr = useRef('');

  useEffect(() => {
    loadTasks();
  }, []);

  function saveTasks(updatedTasks) {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  function addTask() {
    const newTask = {
      title: taskTitle.current.value,
      description: taskDescr.current.value
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    taskTitle.current.value = '';
    taskDescr.current.value = '';
  }

  function deleteTask(index) {
    const tasksCopy = [...tasks];
    tasksCopy.splice(index, 1);
    setTasks(tasksCopy);
    saveTasks(tasksCopy);
  }

  function completeTask(index) {
    const tasksCopy = [...tasks];
    tasksCopy[index].completed = !tasksCopy[index].completed;
    setTasks(tasksCopy);
    saveTasks(tasksCopy);
  }

  function loadTasks() {
    const loadedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (loadedTasks) {
      setTasks(loadedTasks);
    }
  }

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <input ref={taskTitle} placeholder="Task Title" />
      <input ref={taskDescr} placeholder="Task Description" />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => completeTask(index)}>Complete</button>
            <p> {task.completed && <span> (Completed)</span>} </p>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}