import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Box } from '@mui/material'
import Footer from './components/Footer/Footer'

const Layout = (props) => {
  const { children } = props || {}
  return (
    <React.Fragment>
      <Box position={"absolute"} width={"100%"}><Navbar /></Box>
        <Box >{children}</Box>
      <Box><Footer /></Box>
    </React.Fragment>
  )
}

export default Layout