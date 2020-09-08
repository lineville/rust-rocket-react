import React, { useState, useEffect, useCallback } from 'react'
import { Puppy } from '../Puppy'
import { PuppyListItem } from './PuppyListItem'
import {
  createPuppy,
  updatePuppy,
  deletePuppy,
  getPuppies,
} from '../services/PuppiesService'
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core'
import NewPuppyForm from './NewPuppyForm'
import { NewPuppy } from '../NewPuppy'
import { pageSizeOptions, headings } from '../constants/Puppies'

const Puppies = () => {
  const [puppies, setPuppies] = useState<Array<Puppy>>([])
  const [take, setTake] = useState(10)
  const [skip, setSkip] = useState(0)

  // * Gets all the puppies
  const fetchPuppies = useCallback(async () => {
    const puppies = await getPuppies(take, skip)
    setPuppies(puppies)
  }, [skip, take])

  useEffect(() => {
    fetchPuppies()
  }, [fetchPuppies])

  // * Adds a new pup
  const addPup = async (pup: NewPuppy) => {
    const newPup = await createPuppy(pup)
    setPuppies([...puppies, newPup])
  }

  // * Updates the pup with new name and breed
  const updatePup = async (pup: Puppy, idx: number) => {
    const updatedPup = await updatePuppy(pup)
    let modifiedPups = [...puppies]
    modifiedPups[idx] = updatedPup
    setPuppies(modifiedPups)
  }

  // * Deletes pup with the given id
  const deletePup = async (id: number) => {
    await deletePuppy(id)
    setPuppies(puppies.filter((p: Puppy) => p.id !== id))
  }

  // * Copies pup and creates a new one
  const copyPup = async (pup: Puppy) => {
    const copiedPuppy = await createPuppy({
      name: pup.name,
      breed: pup.breed,
      age: pup.age,
      owner_id: pup.owner_id,
    })
    setPuppies([...puppies, copiedPuppy])
  }

  // * --------------------- RENDER FUNCTIONS --------------------

  // * Table headings
  const tableHeadings = () => (
    <TableHead>
      <TableRow>
        {headings?.map((heading: string, idx: number) => (
          <TableCell key={idx} align="right">
            {heading}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )

  // * Table body of rows
  const tableBody = () => (
    <TableBody>
      {puppies.map((pup: Puppy, idx: number) => (
        <PuppyListItem
          key={pup.id}
          idx={idx}
          puppy={pup}
          onDelete={deletePup}
          onUpdate={updatePup}
          onCopy={copyPup}
        />
      ))}
    </TableBody>
  )

  // * Pagination footer
  const tableFooter = () => (
    <TablePagination
      rowsPerPageOptions={pageSizeOptions}
      component="div"
      count={-1}
      rowsPerPage={take}
      page={skip}
      onChangePage={(_event, page) => setSkip(page)}
      onChangeRowsPerPage={(event) => setTake(parseInt(event.target.value, 10))}
    />
  )

  // * Displays the table of puppies
  const puppyTable = () => (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        {tableHeadings()}
        {tableBody()}
      </Table>
      {tableFooter()}
    </TableContainer>
  )

  const puppiesHeader = () => (
    <Typography variant="h3" component="h2" gutterBottom>
      Puppies
    </Typography>
  )

  return (
    <Container>
      {puppiesHeader()}
      <NewPuppyForm addPup={addPup} />
      {puppyTable()}
    </Container>
  )
}

export default Puppies
