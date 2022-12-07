import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface InfoCardDisplayProps {
  children: React.ReactNode
  title: string
  actionButtons?: JSX.Element
}

export default function InfoCardDisplay (props: InfoCardDisplayProps): JSX.Element {
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>{props.title}</Typography>
        </Box>
        {props.actionButtons}
      </Box>
      {props.children}
    </React.Fragment>
  )
}
