import * as React from 'react'
import Box from '@mui/material/Box'
import MarketplaceTaskCard from '../Shared/MarketplaceTaskCard'
import Grid from '@mui/material/Grid'


export default function Marketplace (): JSX.Element {
  return (
    <Box sx={{ display: 'flex' }}>
        <Grid container spacing={5}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                <MarketplaceTaskCard title='T1' description='Card for T1' height = '300' />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                <MarketplaceTaskCard title='T2' description='Card for T2' height = '240'/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                <MarketplaceTaskCard title='T3' description='Card for T3' height = '600'/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} >
                <MarketplaceTaskCard title='T4' description='Card for T4' height = '800'/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                <MarketplaceTaskCard title='T2' description='Card for T2' height = '240'/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                <MarketplaceTaskCard title='T3' description='Card for T3' height = '240'/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} >
                <MarketplaceTaskCard title='T1' description='Card for T1' height = '240'/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                <MarketplaceTaskCard title='T2' description='Card for T2' height = '240'/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                <MarketplaceTaskCard title='T3' description='Card for T3' height = '240'/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} >
                <MarketplaceTaskCard title='T1' description='Card for T1' height = '240'/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                <MarketplaceTaskCard title='T2' description='Card for T2' height = '240'/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                <MarketplaceTaskCard title='T3' description='Card for T3' height = '240'/>
            </Grid>
        </Grid>
    </Box>
  )
}
