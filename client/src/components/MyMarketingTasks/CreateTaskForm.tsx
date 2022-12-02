import React, { useState, useEffect }  from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { getCookie } from '../../utils/utils'
import useAuth from '../../hooks/AuthHook'

export default function FormDialog({refreshFunc} : {refreshFunc:Function}) {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [ title, setTitle] = useState("");
  const [ description, setDescription ] = useState("");
  const [ deliverables, setDeliverables] = useState("");
  const [ compensation, setCompensation ] = useState("");
  const [ endDate, setEndDate] = useState("");
  const [ location, setLocation ] = useState("");
  const [ image, setImage ] = useState<any|null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const create = () => {
    const uploadData = new FormData();
    uploadData.append("userId", auth.userId);
    uploadData.append('title', title);
    uploadData.append("description", description)
    uploadData.append("deliverables", deliverables)
    uploadData.append("compensation", compensation)
    uploadData.append("postedDate", "2022-11-30")
    uploadData.append("endDate", "2022-11-30")
    uploadData.append("location", location)
    uploadData.append('image', image);

    axios.post('http://127.0.0.1:8000/api/create_task/', uploadData, {
    headers: {
        'X-CSRFTOKEN': getCookie('csrftoken')
    }
    })
    .then((response) => {
        console.log(response);
        refreshFunc();
    })
    .catch(error => console.log(error))
    handleClose();
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
          <input type="file" onChange={(evt) => setImage(evt.target!.files![0])}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={create}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
