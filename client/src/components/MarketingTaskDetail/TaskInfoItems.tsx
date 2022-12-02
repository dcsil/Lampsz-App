import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function TaskInfoItems ({ label, text }: { label: string, text: string }): JSX.Element {
  return (
    <Box display="flex" py={1} pr={2}>
      <Typography variant="body2" fontWeight="bold">{label}: &nbsp;</Typography>
      <Typography variant="body2" fontWeight="regular" color="text.secondary">&nbsp;{text}</Typography>
    </Box>
  )
}
