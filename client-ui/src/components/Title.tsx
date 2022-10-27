import React, { ReactNode } from "react"
// mui
import { Typography } from "@mui/material"

type Props = {
  children: ReactNode;
}

const Title:React.FC<Props> = ({ children }) => {
  return (
    <Typography sx={{
      color: 'rgba(0,0,0,0.87)', fontSize: '16px', fontWeight: 500,
      '@media (min-width: 600px)': { fontSize: '20px' },
      '@media (min-width: 1240px)': { fontSize: '24px' }
    }}>
      {children}
    </Typography>
  )
}

export default Title;
