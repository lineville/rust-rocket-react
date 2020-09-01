import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'

type PuppiesProps = { message: string }

interface Puppy {
  id: number
  name: string
  breed: string
}

const Puppies = ({ message }: PuppiesProps) => {
  const [data, setData] = useState<[Puppy]>()

  useEffect(() => {
    axios.get('http://localhost:8000/puppies').then((res: AxiosResponse) => {
      console.log(res)
      setData(res.data)
    })
  }, [])

  return (
    <div>
      <h3>{message}</h3>
      <p>{data}</p>
      {/* <ul>
        {data?.map((pup: Puppy) => (
          <li key={pup.id}>{pup.name}</li>
        ))}
      </ul> */}
    </div>
  )
}

export default Puppies
