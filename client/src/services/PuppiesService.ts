import axios from 'axios'
import { Puppy } from '../Puppy'

const API_PATH =
  process.env.REACT_APP_API_PATH + '/puppies' ||
  'http://localhost:8000/api/puppies'

// * Gets all the puppies skipping (skip many) and taking at most (take many)
export const getPuppies = async (
  take: number,
  skip: number
): Promise<Array<Puppy>> => {
  const response = await axios.get(API_PATH, { params: { skip, take } })
  return response.data
}

// * Gets the puppy with the given id
export const getPuppy = async (id: number): Promise<Puppy> => {
  const response = await axios.get(`${API_PATH}/${id}`)
  return response.data
}

// * Creates a new puppy with given name, age and breed
export const createPuppy = async (pup: Puppy): Promise<Puppy> => {
  const response = await axios.post(API_PATH, pup)
  return response.data
}

// * Updates the pup with new name and breed
export const updatePuppy = async (pup: Puppy): Promise<Puppy> => {
  const response = await axios.put(API_PATH, pup)
  return response.data
}

// * Deletes pup with the given id
export const deletePuppy = async (id: number): Promise<boolean> => {
  const response = await axios.delete(`${API_PATH}/${id}`)
  return response.data
}
