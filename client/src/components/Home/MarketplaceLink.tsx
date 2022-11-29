import * as React from 'react'
import Paper from '@mui/material/Paper'
import { Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { containerStyle } from '../../utils/utils'

export default function MarketplaceLink (): JSX.Element {
  return (
    <Paper sx={containerStyle.centeredPaper}>
      <Stack direction='column'>
        <Typography component="h1" variant="h5">
          Find Marketing Tasks on the Marketplace!
        </Typography>
        <Button href="/marketplace">Go To Marketplace</Button>
      </Stack>
    </Paper>
  )
}
