import * as React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

interface ListDisplayProps {
  title: string
  children: React.ReactNode
  content: string
  link: string
}

export default function ListDisplay ({ title, children, content, link }: ListDisplayProps): JSX.Element {
  return (
    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" color="primary" gutterBottom mb={2}>
        {title}
      </Typography>
      {children}
      <Link color="primary" href={link} sx={{ mt: 3 }}>
        See all your {content}
      </Link>
    </Paper>
  )
}
