import * as React from 'react'
import Typography from '@mui/material/Typography'
import { Variant } from '@mui/material/styles/createTypography'

interface TitleProps {
  children?: React.ReactNode
  variant?: Variant
}

export default function PanelTitle ({ children, variant = 'h6' }: TitleProps): JSX.Element {
  return (
    <Typography component="h2" variant={variant} color="primary" gutterBottom>
      {children}
    </Typography>
  )
}
