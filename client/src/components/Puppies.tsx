import React, { useState, useEffect } from 'react'
import { Puppy } from '../Puppy'
import { PuppyListItem } from './PuppyListItem'
import {
  createPuppy,
  updatePuppy,
  deletePuppy,
  getPuppies,
} from '../services/PuppiesService'
import {
  Button,
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
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const Puppies = () => {
  const classes = useStyles()
  const [puppies, setPuppies] = useState<Array<Puppy>>([])
  const [newPupName, setNewPupName] = useState('')
  const [newPupBreed, setNewPupBreed] = useState('')
  const [newPupAge, setNewPupAge] = useState(0)
  const [take, setTake] = useState(20)
  const [skip, setSkip] = useState(0)

  // * Submits the form and calls addPup
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await addPup()
  }

  // const handleChangePage = (event: unknown, page: number) => {
  //   setSkip(page)
  // }

  // const handleChangeRowsPerPage = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setTake(parseInt(event.target.value, 10))
  //   setSkip(0)
  // }

  // * Adds a new pup
  const addPup = async () => {
    const newPup = await createPuppy(newPupName, newPupBreed, newPupAge)
    setNewPupBreed('')
    setNewPupName('')
    setNewPupAge(0)
    setPuppies([...puppies, newPup])
  }

  // * Updates the pup with new name and breed
  const updatePup = async (pup: Puppy) => {
    const updatedPup = await updatePuppy(pup)
    setPuppies([...puppies.filter((p: Puppy) => p.id !== pup.id), updatedPup])
  }

  // * Deletes pup with the given id
  const deletePup = async (id: number) => {
    await deletePuppy(id)
    setPuppies(puppies.filter((p: Puppy) => p.id !== id))
  }

  // * Copies pup and creates a new one
  const copyPup = async (pup: Puppy) => {
    const copiedPuppy = await createPuppy(pup.name, pup.breed, pup.age)
    setPuppies([...puppies, copiedPuppy])
  }

  // * Gets all the puppies
  const fetchPuppies = async () => {
    const puppies = await getPuppies(take, skip)
    setPuppies(puppies)
  }

  useEffect(() => {
    fetchPuppies()
  }, [])

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

      <Button
        variant="contained"
        color="primary"
        endIcon={<AddIcon />}
        onClick={addPup}
      >
        Add Pup!
      </Button>
    </form>
  )

  const puppyTable = () => (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Breed</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Copy</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {puppies.map((pup: Puppy) => (
            <PuppyListItem
              puppy={pup}
              onDelete={deletePup}
              onUpdate={updatePup}
              onCopy={copyPup}
            />
          ))}
        </TableBody>
      </Table>

      {/* TODO FIXME PAGINATION */}
      {/* <TablePagination
        rowsPerPageOptions={[20, 30, 40]}
        component="div"
        count={puppies.length}
        rowsPerPage={take}
        page={skip}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </TableContainer>
  )

  return (
    <Container>
      <Typography variant="h3" component="h2" gutterBottom>
        Puppies
      </Typography>
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
        width: '25ch',
      },
    },
    table: {
      minWidth: 650,
    },
  })
)

export default Puppies
