import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { search } from '../../actions/marketingTask'
import { MarketingTask, SetState } from '../../utils/types'

const iconStyle = {
  width: 33,
  height: 33
}

export function SearchBar ({ setTasks }: { setTasks: SetState<MarketingTask[]> }): JSX.Element {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')

  const handleQuery = (event: any): void => {
    const query = event.target.value
    setQuery(query)
  }

  const handleLocation = (event: any): void => {
    const location = event.target.value
    setLocation(location)
  }

  const listenEnter = (event: any): void => {
    // If the key pressed is entered, do the search.
    if (event.keyCode === 13) {
      search(query, location, setTasks)
    }
  }

  return (
    <div className="search">
      <Box marginTop={1} marginBottom={5}>
        <IconButton>
          <SearchIcon style={iconStyle}/>
        </IconButton>
        <TextField label="Search" onChange={handleQuery} onKeyDown={listenEnter}></TextField>

        <IconButton>
          <LocationOnIcon style={iconStyle}/>
        </IconButton>
        <TextField label="Location" onChange={handleLocation} onKeyDown={listenEnter}></TextField>

        <Button
          variant="outlined"
          sx={{ ml: 4, mt: 1 }}
          onClick={() => search(query, location, setTasks)}
        >
          Search
        </Button>
      </Box>
    </div>
  )
}
