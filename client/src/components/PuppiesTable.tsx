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
  TextField,
  Typography,
  Fab,
} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Add } from '@material-ui/icons'

const Puppies = () => {
  const classes = useStyles()
  const [puppies, setPuppies] = useState<Array<Puppy>>([])
  const [newPupName, setNewPupName] = useState('')
  const [newPupBreed, setNewPupBreed] = useState('')
  const [newPupAge, setNewPupAge] = useState(0)
  const [take, setTake] = useState(5)
  const [skip, setSkip] = useState(0)
  const pageSizeOptions = [5, 10, 20, 40]
  const headings = ['Id', 'Name', 'Breed', 'Age', 'Edit', 'Copy', 'Delete']

  // * Gets all the puppies
  const fetchPuppies = useCallback(async () => {
    const puppies = await getPuppies(take, skip)
    setPuppies(puppies)
  }, [skip, take])

  useEffect(() => {
    fetchPuppies()
  }, [fetchPuppies])

  // * Submits the form and calls addPup
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await addPup()
  }

  // * Adds a new pup
  const addPup = async () => {
    const newPup = await createPuppy({
      name: newPupName,
      breed: newPupBreed,
      age: newPupAge,
    })
    setNewPupBreed('')
    setNewPupName('')
    setNewPupAge(0)
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
    })
    setPuppies([...puppies, copiedPuppy])
  }

  // * --------------------- RENDER FUNCTIONS --------------------

  // * Displays a new puppy form
  const newPupForm = () => (
    <form onSubmit={handleSubmit} className={classes.root}>
      <TextField
        id="newPupName"
        label="Name"
        inputProps={{
          onChange: (e) => setNewPupName((e.target as HTMLInputElement).value),
          value: newPupName,
          color: 'primary',
          size: 'medium',
        }}
      />

      <TextField
        id="newPupBreed"
        label="Breed"
        inputProps={{
          onChange: (e) => setNewPupBreed((e.target as HTMLInputElement).value),
          value: newPupBreed,
          color: 'primary',
          size: 'medium',
        }}
      />

      <TextField
        id="newPupAge"
        label="Age"
        type="number"
        inputProps={{
          onChange: (e) =>
            setNewPupAge(parseInt((e.target as HTMLInputElement).value, 10)),
          value: newPupAge,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Fab size="medium" color="primary" aria-label="add" onClick={addPup}>
        <Add />
      </Fab>
    </form>
  )

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
      {newPupForm()}
      {puppyTable()}
    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
)

export default Puppies
