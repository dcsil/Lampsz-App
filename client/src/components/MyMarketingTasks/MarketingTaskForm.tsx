import React, { FormEvent, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useAuth from '../../hooks/AuthHook'
import { FormTextField } from '../Shared/FormTextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { isoToDate } from '../../utils/utils'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { updateMarketingTask } from '../../actions/marketingTask'
import { MarketingTask } from '../../utils/types'
import { useNavigate } from 'react-router-dom'

interface MarketingTaskFormProp {
  closeDialog: VoidFunction
  open: boolean
  isCreate: boolean
  taskData?: MarketingTask
}

export default function MarketingTaskForm (
  { closeDialog, open, isCreate, taskData }: MarketingTaskFormProp
): JSX.Element {
  const auth = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>(taskData?.title ?? '')
  const [description, setDescription] = useState<string>(taskData?.description ?? '')
  const [deliverables, setDeliverables] = useState<string>(taskData?.deliverables ?? '')
  const [compensation, setCompensation] = useState<number>(taskData?.compensation ?? 0)
  const [endDate, setEndDate] = useState<Dayjs>(taskData?.endDate ? dayjs(taskData?.endDate) : dayjs())
  const [location, setLocation] = useState<string>(taskData?.location ?? '')
  const [image, setImage] = useState<any | null>(null)

  const submit = (event: FormEvent): void => {
    event.preventDefault()

    const uploadData = new FormData()
    uploadData.append('companyId', auth.userId.toString())
    uploadData.append('title', title)
    uploadData.append('description', description)
    uploadData.append('deliverables', deliverables)
    uploadData.append('compensation', compensation.toString())
    uploadData.append('postedDate', isoToDate(new Date().toISOString()))
    uploadData.append('endDate', isoToDate(endDate.toISOString()))
    uploadData.append('location', location)
    if (image !== null) {
      uploadData.append('image', image)
    }

    const callback = (): void => {
      closeDialog()
      navigate(0)
    }
    updateMarketingTask(uploadData, callback, isCreate, taskData?.id)
  }

  return (
    <Dialog open={open} onClose={closeDialog}>
      <Box component="form" onSubmit={submit}>
        <DialogTitle>Create a New Marketing Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <FormTextField
                id="name" autoFocus label="Task Title"
                value={title} margin="dense"
                onChange={(evt) => setTitle(evt.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <FormTextField
                id="compensation" label="Task Compensation" margin="dense"
                value={compensation.toString()} type="number"
                onChange={(evt) => setCompensation(parseInt(evt.target.value))}
              />
            </Grid>
            <Grid item lg={12}>
              <FormTextField
                id="description" label="Task Description" multiline rows={4}
                value={description} margin="dense"
                onChange={(evt) => setDescription(evt.target.value)}
              />
              <FormTextField
                id="deliverables" label="Task Deliverables" multiline rows={4}
                value={deliverables} margin="dense"
                onChange={(evt) => setDeliverables(evt.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <FormTextField
                id="location" label="Location"
                value={location} margin="dense"
                onChange={(evt) => setLocation(evt.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date"
                  value={endDate} minDate={dayjs(taskData?.postedDate) ?? dayjs()}
                  onChange={(value) => setEndDate(value!)}
                  renderInput={(params: any) => <TextField {...params} margin="dense"/>}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs>
              <DialogContentText sx={{ mb: 1, mt: 1 }}>
                Upload an Image for Your Marketing Task
              </DialogContentText>
              <input type="file" onChange={(evt) => setImage(evt.target.files![0])}/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button type="submit">{isCreate ? 'Create' : 'Edit'}</Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
