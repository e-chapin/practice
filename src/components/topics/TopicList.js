import React, { useContext, useEffect, useState } from 'react'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'

import Title from '../dashboard/Title'
import { firestore } from '../../services/firebase'
import { ActionCell, EditCell, EditCheckboxCell } from './DynamicCell'
import { UserContext } from '../../providers/UserProvider'

const TopicList = () => {
  const user = useContext(UserContext)
  const [topics, setTopics] = useState([])

  useEffect(() => {
    firestore
      .collection('users/' + user.uid + '/topics')
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return Object.assign(doc.data(), { id: doc.id, status: null })
        })
        setTopics(data)
      })
  }, [])

  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], topics)
    nextData.find((item) => item.id === id)[key] = value
    setTopics(nextData)
  }

  const handleCheckboxChange = (id, key, value) => {
    const nextData = Object.assign([], topics)
    var item = nextData.find((item) => item.id === id)
    item[key] = !item[key]
    setTopics(nextData)
  }

  const handleEditState = (id) => {
    const nextData = Object.assign([], topics.slice())
    const activeItem = nextData.find((item) => item.id === id)
    if (activeItem.status == 'EDIT') {
      var toSave = activeItem
      delete toSave.status
      delete toSave.id
      firestore
        .doc('users/' + user.uid + '/topics/' + id)
        .update(toSave, { merge: true })
      activeItem.status = null
    } else {
      activeItem.status = 'EDIT'
    }
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

          <Column width={300}>
            <HeaderCell>Active</HeaderCell>
            <EditCheckboxCell dataKey="active" onChange={handleCheckboxChange} />
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
