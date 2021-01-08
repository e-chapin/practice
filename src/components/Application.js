import React, { useContext } from 'react'
import { Router } from '@reach/router'
import SignIn from './SignIn'
import SignUp from './SignUp'
import UserHomepage from './UserHomepage'
import PasswordReset from './PasswordReset'
import Header from './Header'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { UserContext } from '../providers/UserProvider'

const styles = {
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: 20,
    paddingBottom: 0,
    paddingRight: 10,
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  h1: {
    margin: 0,
    padding: 0,
  },
  h3: {
    marginBottom: 0,
  },
  logo: {
    height: 50,
    marginRight: 10,
  },
  add: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
}

const muiTheme = getMuiTheme()

function Application() {
  const user = useContext(UserContext)
  return user ? (
    <MuiThemeProvider muiTheme={muiTheme}>
      <UserHomepage />
    </MuiThemeProvider>
  ) : (
    <Router>
      <SignUp path="signUp" />
      <SignIn path="/" />
      <PasswordReset path="passwordReset" />
    </Router>
  )
}

export default Application
