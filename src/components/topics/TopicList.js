import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'

import Title from '../dashboard/Title'
import { firestore } from '../../services/firebase'
import { ActionCell, EditCell } from './EditCell'
import { UserContext } from '../../providers/UserProvider'

const TopicList = () => {
  const user = useContext(UserContext)
  const [topics, setTopics] = useState({})

  useEffect(() => {
    firestore
      .collection('users/' + user.uid + '/topics')
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data())
        console.log(data)
        setTopics(data)
      })
  })

  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], topics)
    nextData.find((item) => item.id === id)[key] = value
    setTopics(nextData)
  }
  const handleEditState = (id) => {
    const nextData = Object.assign([], topics)
    const activeItem = nextData.find((item) => item.id === id)
    activeItem.status = activeItem.status ? null : 'EDIT'
    setTopics(nextData)
  }

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

          <Column flexGrow={1}>
            <HeaderCell>Active</HeaderCell>
            <ActionCell dataKey="active" onClick={handleEditState} />
          </Column>
        </Table>
      )}
    </React.Fragment>
  )
}

export default TopicList
