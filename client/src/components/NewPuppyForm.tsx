import React, { useState } from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { TextField, Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { NewPuppy } from '../NewPuppy'

interface NewPuppyFormProps {
  addPup: (pup: NewPuppy) => Promise<void>
}

// * Displays a new puppy form
const NewPuppyForm = (props: NewPuppyFormProps) => {
  const classes = useStyles()
  const [newPupName, setNewPupName] = useState('')
  const [newPupBreed, setNewPupBreed] = useState('')
  const [newPupAge, setNewPupAge] = useState(0)

  // * Submits the form and calls addPup
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await props.addPup({ name: newPupName, breed: newPupBreed, age: newPupAge })
    setNewPupBreed('')
    setNewPupName('')
    setNewPupAge(0)
  }

  return (
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

      <Fab
        size="medium"
        color="primary"
        aria-label="add"
        onClick={handleSubmit}
      >
        <Add />
      </Fab>
    </form>
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
export default NewPuppyForm
