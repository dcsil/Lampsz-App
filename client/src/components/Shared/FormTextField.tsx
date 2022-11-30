import TextField from '@mui/material/TextField'
import * as React from 'react'
import { FormFieldEvent } from '../../utils/types'

interface FormTextFieldProps {
  id: string
  label: string
  error: boolean
  value: string
  autoComplete?: string
  type?: string
  onChange: (event: FormFieldEvent) => void
}

export function FormTextField ({ id, label, error, value, autoComplete, type, onChange }: FormTextFieldProps): JSX.Element {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={id}
      label={label}
      name={id}
      autoComplete={autoComplete}
      autoFocus
      type={type}
      error={error}
      value={value}
      onChange={onChange}
    />
  )
}
