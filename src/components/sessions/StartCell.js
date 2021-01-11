import { Cell } from 'rsuite-table'
import Link from '@material-ui/core/Link'
import { Button } from '@material-ui/core'

export const StartSessionCell = ({ rowData, dataKey, onChange, ...props }) => {
  const link = '/session/' + dataKey
  return (
    <Cell>
      <Link href={link}>
        start sessions
        {/* <Button>Start Session</Button> */}
      </Link>
    </Cell>
  )
}
