import React, { useState } from 'react'
import { Puppy } from '../Puppy'

interface PuppyListItemProps {
  puppy: Puppy
  onDelete: (id: number) => Promise<void>
  onUpdate: (pup: Puppy) => Promise<void>
}

export const PuppyListItem = (props: PuppyListItemProps) => {
  const { id, name, breed } = props.puppy

  const [editing, setEditing] = useState(false)
  const [newPupName, setNewPupName] = useState(name)
  const [newPupBreed, setNewPupBreed] = useState(breed)

  const savePup = async () => {
    props.onUpdate({ id, name: newPupName, breed: newPupBreed })
    setEditing(false)
  }

  const editPupRow = () => (
    <span>
      <label>Name: </label>
      <input
        type="text"
        value={newPupName}
        onChange={(e) => setNewPupName(e.target.value)}
      />

      <label>Breed: </label>
      <input
        type="text"
        value={newPupBreed}
        onChange={(e) => setNewPupBreed(e.target.value)}
      />
      <button type="button" onClick={savePup}>
        ✅
      </button>
      <button type="button" onClick={() => setEditing(false)}>
        🚫
      </button>
    </span>
  )

  const displayPupRow = () => (
    <span style={{ marginRight: 10 }}>
      Id: {id} Name: {name} Breed: {breed}
      <button type="button" onClick={() => setEditing(true)}>
        ✏️
      </button>
    </span>
  )

  return (
    <li key={id}>
      {editing ? editPupRow() : displayPupRow()}

      <button type="button" onClick={() => props.onDelete(id)}>
        🗑️
      </button>
    </li>
  )
}
