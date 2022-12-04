import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import axios from 'axios'
import { getRequestConfig } from '../../utils/utils'

export function SearchBar ({ setTasks }: { setTasks: Function }): JSX.Element {
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
    // If the key pressed is enter, do the search.
    if (event.keyCode === 13) {
      search()
    }
  }

  const search = (): void => {
    axios
      .post(('/api/get_tasks/'), { query, location }, getRequestConfig())
      .then(response => {
        console.log(response.data)
        setTasks(response.data.tasks)
      })
      .catch(error => console.log(error))
  }

  const iconStyle = {
    width: 33,
    height: 33
  }

  const buttonMargins = {
    'margin-left': 17,
    'margin-top': 4
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

        <Button variant="outlined" sx={buttonMargins} onClick={search}>Search</Button>
      </Box>
    </div>
  )
}