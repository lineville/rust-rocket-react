import React, { useCallback, useState, useEffect } from 'react'
import { Puppy } from '../Puppy'
import { Delete, Edit, Cancel, Check, FileCopy } from '@material-ui/icons'
import {
  createStyles,
  Fab,
  makeStyles,
  TableCell,
  TableRow,
  TextField,
  Theme,
  Select,
  MenuItem,
} from '@material-ui/core'
import { OwnerWithPuppies } from '../OwnerWithPuppy'
import { getOwnersAndPuppies } from '../services/OwnersService'

interface PuppyListItemProps {
  puppy: Puppy
  onDelete: (id: number) => Promise<void>
  onUpdate: (pup: Puppy, idx: number) => Promise<void>
  onCopy: (pup: Puppy) => Promise<void>
  idx: number
}

export const PuppyListItem = (props: PuppyListItemProps) => {
  const { id, name, breed, age, owner_id } = props.puppy

  const classes = useStyles()
  const [editing, setEditing] = useState(false)
  const [newPupName, setNewPupName] = useState(name)
  const [newPupBreed, setNewPupBreed] = useState(breed)
  const [newPupAge, setNewPupAge] = useState(age)
  const [newPupOwner, setNewPupOwner] = useState(owner_id)
  const [owners, setOwners] = useState<Array<OwnerWithPuppies>>([])

  // * Gets all the puppies asynchronously whenever skip or take is modified
  const fetchOwners = useCallback(async () => {
    const owners = await getOwnersAndPuppies()
    setOwners(owners)
  }, [])

  useEffect(() => {
    fetchOwners()
  }, [fetchOwners])

  // * Updates the pup
  const savePup = async (idx: number) => {
    await props.onUpdate(
      {
        id,
        name: newPupName,
        breed: newPupBreed,
        age: newPupAge,
        owner_id: newPupOwner,
      },
      idx
    )
    setEditing(false)
  }

  // * Displays the editable version of the data row
  const editPupRow = (idx: number) => (
    <>
      <TableCell align="right">
        <TextField
          id="newPupName"
          label="Name"
          inputProps={{
            onChange: (e) =>
              setNewPupName((e.target as HTMLInputElement).value),
            value: newPupName,
            color: 'primary',
            size: 'medium',
          }}
        />
      </TableCell>

      <TableCell align="right">
        <TextField
          id="newPupBreed"
          label="Breed"
          inputProps={{
            onChange: (e) =>
              setNewPupBreed((e.target as HTMLInputElement).value),
            value: newPupBreed,
            color: 'primary',
            size: 'medium',
          }}
        />
      </TableCell>

      <TableCell align="right">
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
      </TableCell>

      <TableCell align="right">
        <Select
          labelId="owner-picker"
          id="demo-simple-select"
          value={newPupOwner}
          onChange={(e) =>
            setNewPupOwner(parseInt((e.target as HTMLInputElement).value, 10))
          }
        >
          {owners?.map((owner) => (
            <MenuItem value={owner.id}>
              {owner.first_name} {owner.last_name}
            </MenuItem>
          ))}
        </Select>
      </TableCell>

      <TableCell align="right">
        <Fab
          size="small"
          color="primary"
          aria-label="save"
          onClick={() => savePup(idx)}
        >
          <Check />
        </Fab>

        <span>&nbsp;&nbsp;&nbsp;</span>

        <Fab
          size="small"
          color="secondary"
          aria-label="cancel"
          onClick={() => setEditing(false)}
        >
          <Cancel />
        </Fab>
      </TableCell>
    </>
  )

  // * Displays the static non-editable version of the data row
  const displayPupRow = () => (
    <>
      <TableCell align="right">{name}</TableCell>
      <TableCell align="right">{breed}</TableCell>
      <TableCell align="right">{age}</TableCell>
      <TableCell align="right">{owner_id}</TableCell>
      <TableCell align="right">
        <Fab
          size="small"
          color="primary"
          aria-label="edit"
          onClick={() => setEditing(true)}
        >
          <Edit />
        </Fab>
      </TableCell>
    </>
  )

  return (
    <TableRow key={id} className={classes.root}>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      {editing ? editPupRow(props.idx) : displayPupRow()}

      <TableCell align="right">
        <Fab
          size="small"
          color="default"
          aria-label="add"
          onClick={() => props.onCopy(props.puppy)}
        >
          <FileCopy />
        </Fab>
      </TableCell>

      <TableCell align="right">
        <Fab
          size="small"
          color="secondary"
          aria-label="add"
          onClick={() => props.onDelete(id)}
        >
          <Delete />
        </Fab>
      </TableCell>
    </TableRow>
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
