import React, { useState, useEffect } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { firestore } from '../../services/firebase'

const Topic = (props) => {
  const topic = props.topic.data()
  const title = props.topic.id

  const [editTitle, setEditTitle] = useState(false)
  const [active, setActive] = useState(topic.active)

  useEffect(
    (e) => {
      firestore
        .doc('users/' + props.uid + '/topics/' + props.topic.id)
        .update({ active: active }, { merge: true })

      console.log(props.topic.data(), 'state changed')
    },
    [editTitle, active]
  )

  const titleFocus = () => {
    setEditTitle(!editTitle)
  }

  const toggleActive = () => {
    props.topic.active = !active
    console.log(props.parentPath)
    setActive(!active)
  }

  console.log(props.topic.id)

  return (
    <TableRow key={title}>
      <TableCell onClick={titleFocus} hidden={editTitle}>
        <span hidden={editTitle}>{title}</span>
      </TableCell>
      <TableCell>{topic.description}</TableCell>
      <TableCell>
        <Link target="_blank" href={topic.url}>
          {topic.url}
        </Link>
      </TableCell>
      <TableCell>
        <Checkbox onClick={toggleActive} checked={active}></Checkbox>
      </TableCell>
      <TableCell>
        <Checkbox checked={editTitle} onClick={titleFocus}></Checkbox>
      </TableCell>
      {/* <TableCell>{row.paymentMethod}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell> */}
    </TableRow>
  )
}

export default Topic
