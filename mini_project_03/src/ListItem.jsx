import { useState } from 'react'

export default function ListItem({ item, index, onDelete, onUpdate, onToggle }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description)

  function save() {
    if (!title.trim()) return
    onUpdate(index, { ...item, title: title.trim(), description: description.trim() || '' })
    setEditing(false)
  }

  function cancel() {
    setTitle(item.title)
    setDescription(item.description)
    setEditing(false)
  }

  return (
    <li className={`list-item ${item.completed ? 'purchased' : ''}`}>
      <div className="main">
        <input
          type="checkbox"
          checked={!!item.completed}
          onChange={() => onToggle(index)}
          aria-label={`Mark ${item.title} complete`}
        />

        {!editing ? (
          <div className="info">
            <div className="name">{item.title}</div>
            <div className="qty">{item.description}</div>
          </div>
        ) : (
          <div className="edit">
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <input value={description} onChange={(e) => setDescription(e.target.value)} className="small" />
          </div>
        )}
      </div>

      <div className="controls">
        {!editing ? (
          <>
            <button className="btn" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn danger" onClick={() => onDelete(index)}>Delete</button>
          </>
        ) : (
          <>
            <button className="btn" onClick={save}>Save</button>
            <button className="btn" onClick={cancel}>Cancel</button>
          </>
        )}
      </div>
    </li>
  )
}

