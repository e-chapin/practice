import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const Topic = (props) => {
  const topic = props.topic.data()
  const title = props.topic.id

  console.log(props.topic.id)

  return (
    <TableRow key={title}>
      <TableCell>{title}</TableCell>
      <TableCell>{topic.description}</TableCell>
      <TableCell>
        <Link target="_blank" href={topic.url}>
          {topic.url}
        </Link>
      </TableCell>
      <TableCell>
        <Checkbox checked={topic.active}></Checkbox>
      </TableCell>
      {/* <TableCell>{row.paymentMethod}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell> */}
    </TableRow>
  )
}

export default Topic
