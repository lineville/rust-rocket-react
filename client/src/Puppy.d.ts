export type Puppy = {
  id: number
  name: string
  breed: string
  age: number
  owner_id: number | null
  owner: Owner | null
}
