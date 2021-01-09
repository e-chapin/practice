import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Checkbox from '@material-ui/core/Checkbox'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Title from '../dashboard/Title'
import firebase from 'firebase'

import Topic from './Topic'

import { UserContext } from '../../providers/UserProvider'
import { useCollection } from 'react-firebase-hooks/firestore'

function preventDefault(event) {
  event.preventDefault()
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}))

const TopicList = () => {
  const classes = useStyles()
  const user = useContext(UserContext)

  const [topics, loading, error] = useCollection(
    firebase.firestore().collection('users/' + user.uid + '/topics'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  return (
    <React.Fragment>
      <Title>Topics</Title>
      {topics && (
        <Table height={420} data={topics}>
          <Column width={200}>
            <HeaderCell>Title</HeaderCell>
            <EditCell dataKey="title" onChange={handleChange} />
          </Column>

          <Column width={200}>
            <HeaderCell>Description</HeaderCell>
            <EditCell dataKey="description" onChange={handleChange} />
          </Column>

          <Column width={300}>
            <HeaderCell>URL</HeaderCell>
            <EditCell dataKey="url" onChange={handleChange} />
          </Column>

          <Column width={300}>
            <HeaderCell>Active</HeaderCell>
            <EditCell dataKey="active" onChange={handleChange} />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Edit</HeaderCell>
            <ActionCell dataKey="id" onClick={handleEditState} />
          </Column>
        </Table>
      )}
    </React.Fragment>
  )
}

export default TopicList
