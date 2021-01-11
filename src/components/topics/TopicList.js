import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Table, Column, HeaderCell } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'

import Title from '../dashboard/Title'
import { firestore } from '../../services/firebase'
import { ActionCell, EditCell, EditCheckboxCell } from './DynamicCell'
import { UserContext } from '../../providers/UserProvider'
import { getTopics } from '../../services/firebase'

const TopicList = () => {
  const user = useContext(UserContext)
  const [topics, setTopics] = useState([])

  useEffect(() => {
    const topics = getTopics(user.uid, setTopics)
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

  const handleActions = (id, action) => {
    if (action == 'edit') {
      handleEditState(id)
    } else if (action == 'delete') {
      handleDelete(id)
    }
  }

  const handleDelete = (id) => {
    const nextData = Object.assign([], topics.slice())
    const toDelete = nextData.find((item) => item.id === id)
    firestore.doc('users/' + user.uid + '/topics/' + id).delete()
    const index = nextData.indexOf(toDelete)
    nextData.splice(index, 1)
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

  const handleNewTopic = () => {
    const newTopic = {
      title: '',
      description: '',
      url: '',
      active: true,
      status: 'EDIT',
    }
    const nextData = Object.assign([], topics.slice())
    const newDoc = firestore.collection('users/' + user.uid + '/topics').doc()
    // debugger
    // firestore.doc(newDoc.path).update(newTopic, { merge: true })
    newDoc.set(newTopic)
    newTopic.id = newDoc.id
    nextData.push(newTopic)
    setTopics(nextData)
    // const activeItem = nextData.find((item) => item.id === id)
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
            <HeaderCell>Actions</HeaderCell>
            <ActionCell dataKey="id" onClick={handleActions} />
          </Column>
        </Table>
      )}
      <Button variant="contained" color="primary" onClick={handleNewTopic}>
        Add New Topic
      </Button>
    </React.Fragment>
  )
}

export default TopicList
