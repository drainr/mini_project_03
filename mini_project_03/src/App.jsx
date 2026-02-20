import { useState, useEffect } from 'react'
import './App.css'
import ListItem from './ListItem'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    loadTasks()
  }, [])

  function saveTasks(updated) {
    localStorage.setItem('tasks', JSON.stringify(updated))
  }

  function loadTasks() {
    const loaded = JSON.parse(localStorage.getItem('tasks'))
    if (loaded) setTasks(loaded)
  }

  function addTask() {
    if (!title.trim()) return
    const newTask = { title: title.trim(), description: description.trim() || '', completed: false }
    const updated = [...tasks, newTask]
    setTasks(updated)
    saveTasks(updated)
    setTitle('')
    setDescription('')
  }

  function deleteTask(index) {
    const copy = [...tasks]
    copy.splice(index, 1)
    setTasks(copy)
    saveTasks(copy)
  }

  function updateTask(index, updatedTask) {
    const copy = [...tasks]
    copy[index] = updatedTask
    setTasks(copy)
    saveTasks(copy)
  }

  function toggleComplete(index) {
    const copy = [...tasks]
    copy[index].completed = !copy[index].completed
    setTasks(copy)
    saveTasks(copy)
  }

  return (
    <div className="App container">
      <h1>To‑Do List</h1>

      <div className="add-form card">
        <label className="label">
          Task
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="label">
          Description
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button className="btn primary" onClick={addTask}>
          Add
        </button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 && <li className="empty">No tasks yet.</li>}
        {tasks.map((task, index) => (
          <ListItem
            key={index}
            index={index}
            item={task}
            onDelete={deleteTask}
            onUpdate={updateTask}
            onToggle={toggleComplete}
          />
        ))}
      </ul>
    </div>
  )
}
