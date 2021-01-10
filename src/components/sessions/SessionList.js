import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Table, Column, HeaderCell } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'

import Title from '../dashboard/Title'
import { firestore } from '../../services/firebase'
import { ActionCell, EditCell, EditCheckboxCell } from '../topics/DynamicCell'
import { UserContext } from '../../providers/UserProvider'

const SessionList = () => {
  const user = useContext(UserContext)
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    firestore
      .collection('users/' + user.uid + '/sessions')
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return Object.assign(doc.data(), { id: doc.id, status: null })
        })
        setSessions(data)
      })
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
    // const activeItem = nextData.find((item) => item.id === id)
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

          {/* <Column width={300}>
            <HeaderCell>URL</HeaderCell>
            <EditCell dataKey="url" onChange={handleChange} />
          </Column>

          <Column width={300}>
            <HeaderCell>Active</HeaderCell>
            <EditCheckboxCell dataKey="active" onChange={handleCheckboxChange} />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Actions</HeaderCell>
            <ActionCell dataKey="id" onClick={handleActions} />
          </Column> */}
        </Table>
      )}
      <Button variant="contained" color="primary" onClick={handleNewSession}>
        Add New Session
      </Button>
    </React.Fragment>
  )
}

export default SessionList
