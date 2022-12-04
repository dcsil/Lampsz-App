import * as React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { Stack } from '@mui/material'
import useAuth from '../../hooks/AuthHook'
import { MarketingTask, UserType } from '../../utils/types'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { changeMarketingTaskState, deleteMarketingTask } from '../../actions/marketingTask'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { createApplication, deleteApplication } from '../../actions/taskApplication'

enum Actions {
  CLOSE,
  DELETE,
  REOPEN
}

const deleteTaskTitle = 'Confirm Delete this marketing task?'
const deleteTaskDescription = 'Deleting a task will permanently remove it from the system. Consider using Close Task instead.'
const closeTaskTitle = 'Confirm Close this marketing task?'
const closeTaskDescription = 'You can re-open any closed tasks from the archive section in My Marketing Task page.'
const reOpenTaskTitle = 'Confirm Re-opening this marketing task?'

function ConfirmationDialog (
  {
    id,
    title,
    description,
    open,
    handleClose,
    action
  }: {
    id: number
    title: string
    description?: string
    open: boolean
    handleClose: VoidFunction
    action: Actions
  }
): JSX.Element {
  const navigate = useNavigate()

  const continueAction = (): void => {
    switch (action) {
      case Actions.CLOSE:
        changeMarketingTaskState(id, false, () => {
          handleClose()
          navigate(0)
        })
        break
      case Actions.DELETE:
        deleteMarketingTask(id, () => {
          handleClose()
          navigate('/tasks/')
        })
        break
      case Actions.REOPEN:
        changeMarketingTaskState(id, true, () => {
          handleClose()
          navigate(0)
        })
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {description && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={continueAction}>Continue</Button>
      </DialogActions>
    </Dialog>
  )
}

function TaskOwnerActionButtons ({ onClick }: { onClick: (action: Actions) => void }): JSX.Element {
  const { active } = useLoaderData() as MarketingTask

  return (
    <Stack p={1} spacing={1}>
      <React.Fragment>
        <Button variant="contained" color="error" onClick={() => onClick(Actions.DELETE)}>Delete Task</Button>
        {active
          ? <Button variant="contained" color="warning" onClick={() => onClick(Actions.CLOSE)}>Close Task</Button>
          : <Button variant="contained" color="info" onClick={() => onClick(Actions.REOPEN)}>Re-open Task</Button>
        }
      </React.Fragment>
    </Stack>
  )
}

function InfluencerActionButtons (): JSX.Element {
  const auth = useAuth()
  const { id } = useLoaderData() as MarketingTask

  React.useEffect(() => {

  }, [])

  return (
    <Stack p={1} spacing={1}>
      <Button variant="contained" color="info" onClick={() => createApplication(auth.userId, id)}>Apply</Button>
      <Button variant="contained" color="error" onClick={() => deleteApplication()}>Unapply</Button>
    </Stack>
  )
}

export default function TaskHeader (): JSX.Element {
  const auth = useAuth()
  const { title, company, id } = useLoaderData() as MarketingTask
  const [open, setOpen] = React.useState(false)
  const [dialogTitle, setDialogTitle] = React.useState('')
  const [dialogDescription, setDialogDescription] = React.useState('')
  const [action, setAction] = React.useState<Actions>(Actions.REOPEN)

  const taskOwnerActions = (action: Actions): void => {
    switch (action) {
      case Actions.CLOSE:
        setDialogTitle(closeTaskTitle)
        setDialogDescription(closeTaskDescription)
        break
      case Actions.DELETE:
        setDialogTitle(deleteTaskTitle)
        setDialogDescription(deleteTaskDescription)
        break
      case Actions.REOPEN:
        setDialogTitle(reOpenTaskTitle)
    }
    setAction(action)
    setOpen(true)
  }

  return (
    <React.Fragment>
      <ConfirmationDialog
        id={id}
        open={open}
        handleClose={() => setOpen(false)}
        title={dialogTitle}
        description={dialogDescription}
        action={action}
      />
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h3" gutterBottom textTransform="capitalize">{title}</Typography>
          <Box display="flex" alignItems="center" component={Link} to={`/profile/${company.user.id}`}>
            <Box sx={{ m: 1, mr: 2 }}>
              <Avatar alt="company-logo"/>
            </Box>
            <Box>
              <Typography variant="h6">{company.companyName}</Typography>
            </Box>
          </Box>
        </Box>

        {auth.userType === UserType.INFLUENCER && <InfluencerActionButtons/>}
        {auth.userId === company.user.id && <TaskOwnerActionButtons onClick={taskOwnerActions}/>}
      </Box>
    </React.Fragment>
  )
}
