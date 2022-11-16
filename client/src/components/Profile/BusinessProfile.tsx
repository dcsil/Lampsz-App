import * as React from 'react'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FactoryIcon from '@mui/icons-material/Factory'
import { containerStyle } from '../../utils/sharedStyles'
import ProfileInfo from './ProfileInfo'
import ProfileDescription from './ProfileDescription'
import { getBusinessProfile } from '../../actions/profile'

const items = [
  {
    icon: <LocationOnIcon/>,
    label: 'Location',
    value: 'Toronto, Ontario'
  },
  {
    icon: <FactoryIcon/>,
    label: 'Industry',
    value: 'Food'
  }
]

export default function BusinessProfile (): JSX.Element {
  const [companyName, setCompanyName] = React.useState('Company Name')
  const [description, setDescription] = React.useState('')

  useEffect(() => {
    getBusinessProfile('temp', setCompanyName, setDescription)
  })

  return (
    <Box component="main" sx={containerStyle.contentBox}>
      <Container maxWidth="md" sx={containerStyle.contentContainer}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <ProfileInfo items={items} name={companyName}/>
          </Grid>
          <Grid item xs={12}>
            <ProfileDescription description={description}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
