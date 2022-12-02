import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

interface TextDisplayWithEditProps {
  title: string
  text: string
}

export default function TextDisplayWithEdit ({ title, text }: TextDisplayWithEditProps): JSX.Element {
  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        margin={2}
        marginBottom={0}
      >
        <Typography variant="h6" fontWeight="medium">{title}</Typography>
        <Typography variant="body2" color="secondary">
          <Tooltip title="Edit Description" placement="top">
            <EditIcon/>
          </Tooltip>
        </Typography>
      </Box>
      <Box p={2}>
        <Typography variant="body1" color="text.secondary" fontWeight="light">
          {text}
        </Typography>
      </Box>
    </React.Fragment>
  )
}
