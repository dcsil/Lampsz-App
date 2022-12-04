import * as React from 'react'
import Link from '@mui/material/Link'
import PanelTitle from '../Shared/PanelTitle'
import { Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import { containerStyle } from '../../utils/utils'

export default function ApplicationList (): JSX.Element {
  return (
    <Paper sx={containerStyle.contentPaper}>
      <PanelTitle variant="h5">Your Applications</PanelTitle>
      <Stack direction="row" spacing={2} marginTop={3}>
      </Stack>
      <Link color="primary" href="/applications" sx={{ mt: 3 }}>
        See all your applications
      </Link>
    </Paper>
  )
}
