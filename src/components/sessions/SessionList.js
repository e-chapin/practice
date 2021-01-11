import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Table, Column, HeaderCell } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'

import Title from '../dashboard/Title'
import { firestore } from '../../services/firebase'
import { ActionCell, EditCell, EditCheckboxCell } from '../topics/DynamicCell'
import { UserContext } from '../../providers/UserProvider'
import { getSessions } from '../../services/firebase'
import { StartSessionCell } from './StartCell'

const SessionList = () => {
  const user = useContext(UserContext)
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    getSessions(user.uid, setSessions)
  }, [])

  const handleChange = (id) => {
    console.log('handle change', id)
  }

  const handleNewSession = () => {
    const newSession = {
      date: Date().toLocaleString(),
      completed: false,
    }
    const nextData = Object.assign([], sessions.slice())
    const newDoc = firestore.collection('users/' + user.uid + '/sessions').doc()
    newDoc.set(newSession)
    newSession.id = newDoc.id
    nextData.push(newSession)
    setSessions(nextData)
  }

  return (
    <React.Fragment>
      <Title>Sessions</Title>
      {sessions && (
        <Table height={420} data={sessions}>
          <Column width={200}>
            <HeaderCell>Date</HeaderCell>
            <EditCell dataKey="date" onChange={handleChange} />
          </Column>

          <Column width={200}>
            <HeaderCell>Completed</HeaderCell>
            <EditCheckboxCell dataKey="completed" onChange={handleChange} />
          </Column>
          <Column width={200}>
            <HeaderCell>Start</HeaderCell>
            <StartSessionCell dataKey="id">Start</StartSessionCell>
          </Column>
        </Table>
      )}
      <Button variant="contained" color="primary" onClick={handleNewSession}>
        Add New Session
      </Button>
    </React.Fragment>
  )
}

export default SessionList
