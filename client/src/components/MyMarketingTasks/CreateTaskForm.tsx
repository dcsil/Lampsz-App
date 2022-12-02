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
  const [ price, setPrice ] = useState("");
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
    uploadData.append("price", "12")
    uploadData.append("postedDate", "2022-11-30")
    uploadData.append("description", "this is a marketing task")
    uploadData.append('title', title);
    uploadData.append('image', image);

    axios.post('http://127.0.0.1:8000/api/create_task/', uploadData, {
    headers: {
        'X-CSRFTOKEN': getCookie('csrftoken')
    }
    })
    .then((response) => {
    console.log(response);
    })
    .catch(error => console.log(error))
    refreshFunc();
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
            Payout for your Marketing Task
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            variant="standard"
            onChange={(evt) => setPrice(evt.target.value)}
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
