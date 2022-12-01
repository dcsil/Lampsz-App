import * as React from 'react'
import Box from '@mui/material/Box'
import { containerStyle } from '../../utils/utils'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Container from '@mui/material/Container'

export default function MarketingTaskDetail (): JSX.Element {
  return (
    <Box component="main" sx={containerStyle.contentBox}>
      <Container maxWidth="lg" sx={containerStyle.contentContainer}>
        <Grid container>
          <Grid item md={7}>
            {/*<Stack spacing={2}>*/}
            <Typography variant="h4">Marketing Task Title</Typography>
            <Box>
              <Avatar alt="company-logo"/>
              <Typography variant="h6">Company name</Typography>
            </Box>
            {/*</Stack>*/}
          </Grid>
          <Grid item md={5}>

          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
