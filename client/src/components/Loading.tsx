import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { Theme } from '@mui/material'

const styles = {
  backdrop: {
    zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
    color: '#fff'
  }
}

export default function Loading (): JSX.Element {
  return (
    <Backdrop open sx={styles.backdrop}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  )
}
