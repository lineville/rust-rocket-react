import axios from 'axios'
import { Owner } from '../Owner'
import { OwnerWithPuppies } from '../OwnerWithPuppy'

const API_PATH = process.env.REACT_APP_API_PATH || 'http://localhost:8000/api'

// * Gets the owners with their puppies included
export const getOwnersAndPuppies = async (): Promise<
  Array<OwnerWithPuppies>
> => {
  const response = await axios.get(`${API_PATH}/owners-and-puppies`)
  return response.data
}

// * Gets the owners
export const getOwners = async (): Promise<Array<Owner>> => {
  const response = await axios.get(`${API_PATH}/owners`)
  return response.data
}
