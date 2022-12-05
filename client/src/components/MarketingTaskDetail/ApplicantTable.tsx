import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridRenderCellParams, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { MarketingTask, TaskApplicant } from '../../utils/types'
import { useLoaderData } from 'react-router-dom'
import { getMarketingTaskApplicants } from '../../actions/taskApplication'
import { GridColumns } from '@mui/x-data-grid/models/colDef/gridColDef'
import Avatar from '@mui/material/Avatar'

const applicantTableColumns: GridColumns = [
  {
    field: 'avatar',
    headerName: 'Avatar',
    valueGetter: (params: any) => params.row.influencer,
    renderCell: ({ value }: GridRenderCellParams) => (
      <Avatar src={value.thumbnailUrl} component='a' href={value.homePage}/>
    ),
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'channelName',
    headerName: 'Channel Name',
    valueGetter: (params: any) => params.row.influencer.channelName,
    width: 200,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'age',
    headerName: 'Age',
    valueGetter: (params: any) => params.row.influencer.age,
    type: 'number',
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'location',
    headerName: 'Location',
    valueGetter: (params: any) => params.row.influencer.location,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'platform',
    headerName: 'Platform',
    valueGetter: (params: any) => params.row.influencer.platform,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'appliedOn',
    headerName: 'Applied Date',
    type: 'date',
    align: 'center',
    headerAlign: 'center',
    width: 120
  }
]

function QuickSearchToolbar (): JSX.Element {
  return (
    <Box sx={{ p: 1.5, pb: 0 }}>
      <GridToolbarQuickFilter/>
    </Box>
  )
}

export default function ApplicantTable (): JSX.Element {
  const { id } = useLoaderData() as MarketingTask
  const [applicants, setApplicants] = React.useState<TaskApplicant[]>([])

  React.useEffect(() => {
    getMarketingTaskApplicants(id, setApplicants)
  }, [])

  return (
    <Box sx={{ height: 500, width: 1 }}>
      <DataGrid
        {...{ rows: applicants, columns: applicantTableColumns }}
        components={{ Toolbar: QuickSearchToolbar }}
      />
    </Box>
  )
}
