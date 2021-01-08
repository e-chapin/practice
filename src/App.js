import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Application from './components/Application'
import UserProvider from './providers/UserProvider'
import Header from './components/Header'

function App() {
  return (
    <UserProvider>
      {/* <Header /> */}
      <Application />
    </UserProvider>
  )
}

export default App
