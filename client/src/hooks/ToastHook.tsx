import * as React from 'react'
import { AlertColor } from '@mui/material/Alert'
import { SetState } from '../utils/types'
import { getMessagesAction } from '../actions/auth'

interface ToastContextType {
  // States
  toastOpen: boolean
  message: string
  level: AlertColor
  // Set states functions
  setToastOpen: SetState<boolean>
  // Custom functions
  getToastMessage: VoidFunction
}

const ToastContext = React.createContext<ToastContextType>(null!)

export function ToastProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const [toastOpen, setToastOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [level, setLevel] = React.useState<AlertColor>('success')

  const getToastMessage = (): void => (
    getMessagesAction((message, level) => {
      setMessage(message)
      setLevel(level)
      setToastOpen(true)
    })
  )

  // APIs provided by the hook
  const states = { toastOpen, message, level }
  const setStates = { setToastOpen }
  const custom = { getToastMessage }
  const value = { ...states, ...setStates, ...custom }

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

export default function useToast (): ToastContextType {
  return React.useContext(ToastContext)
}
