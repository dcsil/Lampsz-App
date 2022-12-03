import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import axios from 'axios'
import useAuth from '../../hooks/AuthHook'
import Cookies from 'js-cookie'

interface CreateTaskFormProp {
  refreshFunc: Function
  userId: number
  csrf: string | undefined
  setTasks: Function
}

export default function FormDialog ({ refreshFunc, userId, csrf, setTasks }: CreateTaskFormProp): JSX.Element {
  const auth = useAuth()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deliverables, setDeliverables] = useState('')
  const [compensation, setCompensation] = useState('')
  const [endDate, setEndDate] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState<any | null>(null)

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const create = (): void => {
    const uploadData = new FormData()
    const today = new Date().toISOString().slice(0, 10)
    uploadData.append('userId', auth.userId.toString())
    uploadData.append('title', title)
    uploadData.append('description', description)
    uploadData.append('deliverables', deliverables)
    uploadData.append('compensation', compensation)
    uploadData.append('postedDate', String(today))
    uploadData.append('endDate', endDate)
    uploadData.append('location', location)
    uploadData.append('image', image)

    axios.post('/api/create_task/', uploadData, {
      headers: {
        'X-CSRFTOKEN': Cookies.get('csrftoken')
      }
    })
      .then((response) => {
        console.log(response)
        refreshFunc(userId, csrf, setTasks)
      })
      .catch(error => console.log(error))
    handleClose()
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create New Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Title of your Marketing Task
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            variant="standard"
            onChange={(evt) => setTitle(evt.target.value)}
          />
          <DialogContentText>
            Description of Your Marketing Task
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            variant="standard"
            onChange={(evt) => setDescription(evt.target.value)}
          />
          <DialogContentText>
            Deliverables for Your Marketing Task
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            variant="standard"
            onChange={(evt) => setDeliverables(evt.target.value)}
          />
          <DialogContentText>
            Compensation for your Marketing Task
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            variant="standard"
            onChange={(evt) => setCompensation(evt.target.value)}
          />
          <DialogContentText>
            End date
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            variant="standard"
            onChange={(evt) => setEndDate(evt.target.value)}
          />
          <DialogContentText>
            Location
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            variant="standard"
            onChange={(evt) => setLocation(evt.target.value)}
          />
          <DialogContentText>
            Upload an Image for Your Marketing Task
          </DialogContentText>
          <input type="file" onChange={(evt) => setImage(evt.target.files![0])}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={create}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
