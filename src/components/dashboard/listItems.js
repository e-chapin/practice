import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ListIcon from '@material-ui/icons/List'
import AssessmentIcon from '@material-ui/icons/Assessment'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { Link } from 'react-router-dom'

export const MainListItems = ({ clickFunc, ...props }) => {
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <Link to="/topics">
        <ListItem button>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Topics" />
        </ListItem>
      </Link>
      <Link to="/sessions">
        <ListItem button>
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Sessions" />
        </ListItem>
      </Link>
    </div>
  )
}

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
)
