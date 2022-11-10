import { Typography } from '@mui/material';
import * as React from 'react';

interface Props {
  isLg?: boolean
}


export function StyledTitle({ isLg = true }: Props) {
  const sx = {
    mr: 2,
    display: isLg ? { xs: 'none', md: 'flex' } : { xs: 'flex', md: 'none' },
    flexGrow: isLg ? 0 : 1,
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
  };

  return (
    <Typography
      variant={isLg ? "h6" : "h5"}
      noWrap
      component="a"
      href="/"
      sx={sx}
    >
      LAMPSZ
    </Typography>
  )
}
