import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Puppy } from '../Puppy'
import { PuppyListItem } from './PuppyListItem'

const Puppies = () => {
  const API_PATH = 'http://localhost:8000/api/puppies'
  const [puppies, setPuppies] = useState<Array<Puppy>>([])
  const [newPupName, setNewPupName] = useState('')
  const [newPupBreed, setNewPupBreed] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await addPup()
  }

  const addPup = async () => {
    axios
      .post(API_PATH, {
        name: newPupName,
        breed: newPupBreed,
      })
      .then((res: AxiosResponse<Puppy>) => {
        setPuppies([...puppies, res.data])
        setNewPupName('')
        setNewPupBreed('')
      })
      .catch((err: Error) => console.error(err.message))
  }

  const updatePup = async (pup: Puppy) => {
    axios
      .put(API_PATH, pup)
      .then((res: AxiosResponse<Puppy>) => {
        setPuppies([...puppies.filter((p: Puppy) => p.id !== pup.id), res.data])
      })
      .catch((err: Error) => console.error(err.message))
  }

  const deletePup = async (id: number) => {
    axios
      .delete(`${API_PATH}/${id}`)
      .then((res: AxiosResponse) => {
        setPuppies(puppies.filter((p: Puppy) => p.id !== id))
      })
      .catch((err: Error) => console.error(err.message))
  }

  // * Fetches puppies
  useEffect(() => {
    axios
      .get(API_PATH)
      .then((res: AxiosResponse<[Puppy]>) => {
        setPuppies(res.data)
      })
      .catch((err: Error) => console.error(err.message))
  }, [])

  // * Displays a new puppy form
  const newPupForm = () => (
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input
        type="text"
        id="newPupName"
        value={newPupName}
        onChange={(e) => setNewPupName(e.target.value)}
      />

      <label>Breed: </label>
      <input
        type="text"
        id="newPupBreed"
        value={newPupBreed}
        onChange={(e) => setNewPupBreed(e.target.value)}
      />

      <button type="button" id="addPupButton" onClick={addPup}>
        Add Pup!
      </button>
    </form>
  )

  // * Displays a list of PuppyListItems
  const puppyList = () => (
    <ul style={{ listStyleType: 'none', alignItems: 'left' }}>
      {puppies?.map((puppy: Puppy) => (
        <PuppyListItem
          puppy={puppy}
          onDelete={deletePup}
          onUpdate={updatePup}
          key={puppy.id}
        />
      ))}
    </ul>
  )

  return (
    <div>
      {newPupForm()}
      {puppyList()}
    </div>
  )
}

export default Puppies
