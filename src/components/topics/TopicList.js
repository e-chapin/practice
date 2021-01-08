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
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topics && (
            <>
              {topics.docs.map((doc) => (
                <Topic topic={doc} />
              ))}
            </>
          )}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  )
}

export default TopicList
