import axios from 'axios'
import process from 'process'
import { OwnerWithPuppies } from '../OwnerWithPuppy'

const API_PATH =
  process.env.REACT_APP_API_PATH + '/owners' ||
  'http://localhost:8000/api/owners'

// * Gets the owners
export const getOwners = async (): Promise<Array<OwnerWithPuppies>> => {
  const response = await axios.get(API_PATH)
  return response.data
}
