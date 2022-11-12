import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { Tab, Tabs } from '@mui/material'
import BusinessLogin from './BusinessLogin'
import TabPanel from '../../components/shared/TabPanel'
import Container from '@mui/material/Container'
import { AuthProps } from '../../utils/sharedProps'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import InfluencerLogin from './InfluencerLogin'

export default function Login (props: AuthProps): JSX.Element {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Business"/>
          <Tab label="Influencer"/>
        </Tabs>
        <TabPanel value={value} index={0}>
          <BusinessLogin {...props}/>
        </TabPanel>
        <TabPanel index={value} value={1}>
          <InfluencerLogin {...props}/>
        </TabPanel>
      </Box>
    </Container>
  )
}
