import * as React from 'react';
import Link from '@mui/material/Link';
import PanelTitle from "../../components/PanelTitle";
import MarketingTaskCard from "../../components/MarketingTaskCard";
import { Stack } from "@mui/material";


const data = [
  {
    title: "T1",
    description: "asdfassdfasdf"
  },
  {
    title: "T2",
    description: "asdfassdfasdf"
  }
]


export default function MarketingTaskList() {
  return (
    <React.Fragment>
      <PanelTitle variant="h5">Your Marketing Tasks</PanelTitle>
      <Stack direction="row" spacing={2}>
        {data.map(item => <MarketingTaskCard title={item.title} description={item.description}/>)}
      </Stack>
      <Link color="primary" href="#" sx={{ mt: 3 }}>
        See all your marketing tasks
      </Link>
    </React.Fragment>
  );
}
