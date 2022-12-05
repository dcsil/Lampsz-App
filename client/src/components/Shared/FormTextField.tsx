import TextField from '@mui/material/TextField'
import * as React from 'react'
import { FormFieldEvent, SetState } from '../../utils/types'

interface FormTextFieldProps {
  id: string
  label: string
  error?: boolean
  value: string
  autoFocus?: boolean
  autoComplete?: string
  type?: string
  margin?: 'dense' | 'normal' | 'none'
  multiline?: boolean
  rows?: number
  errorMsg?: string
  setField: SetState<any>
  setError?: SetState<string>
}

/**
 * Returns a functions that handles form field value change.
 *
 * @param setField state update function for form field.
 * @param setError state update function for error message.
 */
export const formFieldOnChange = (
  setField: SetState<any>,
  setError?: SetState<string>
): (event: FormFieldEvent) => void => {
  return (event) => {
    if (setError) {
      setError('')
    }
    setField(event.target.value)
  }
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
      onChange={formFieldOnChange(props.setField, props.setError)}
      helperText={props.errorMsg}
    />
  )
}
