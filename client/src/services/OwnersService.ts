import axios from 'axios'
import { OwnerWithPuppies } from '../OwnerWithPuppy'

const API_PATH =
  process.env.REACT_APP_API_PATH + '/owners-and-puppies' ||
  'http://localhost:8000/api/owners-and-puppies'

// * Gets the owners
export const getOwners = async (): Promise<Array<OwnerWithPuppies>> => {
  const response = await axios.get(API_PATH)
  return response.data
}
