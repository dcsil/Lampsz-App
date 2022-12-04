import TextField from '@mui/material/TextField'
import * as React from 'react'
import { FormFieldEvent } from '../../utils/types'

interface FormTextFieldProps {
  id: string
  label: string
  error?: boolean
  value: string
  autoFocus?: boolean
  autoComplete?: string
  type?: string
  margin?: 'dense' | 'normal' | 'none',
  multiline?: boolean,
  rows?: number
  errorMsg?: string
  onChange: (event: FormFieldEvent) => void
}

export function FormTextField (props: FormTextFieldProps): JSX.Element {
  return (
    <TextField
      margin={props.margin ?? 'normal'}
      required
      fullWidth
      autoFocus={props.autoFocus}
      id={props.id}
      label={props.label}
      name={props.id}
      autoComplete={props.autoComplete}
      type={props.type}
      error={props.error}
      value={props.value}
      multiline={props.multiline}
      rows={props.rows}
      onChange={props.onChange}
      helperText={props.errorMsg}
    />
  )
}
