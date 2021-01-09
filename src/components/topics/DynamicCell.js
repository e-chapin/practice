import { Cell } from 'rsuite-table'
import { Button } from 'rsuite'

export const EditCell = ({ rowData, dataKey, onChange, ...props }) => {
  const editing = rowData.status === 'EDIT'
  return (
    <Cell {...props} className={editing ? 'table-content-editing' : ''}>
      {editing ? (
        <input
          className="rs-input"
          defaultValue={rowData[dataKey]}
          onChange={(event) => {
            onChange && onChange(rowData.id, dataKey, event.target.value)
          }}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Cell>
  )
}

export const EditCheckboxCell = ({ rowData, dataKey, onChange, ...props }) => {
  const editing = rowData.status === 'EDIT'
  return (
    <Cell {...props} className={editing ? 'table-content-editing' : ''}>
      {editing ? (
        <input
          type="checkbox"
          className="rs-input"
          checked={rowData[dataKey] == true ? 'checked' : ''}
          onChange={(event) => {
            onChange && onChange(rowData.id, dataKey, !rowData[dataKey])
          }}
        />
      ) : (
        <input
          type="checkbox"
          readOnly="true"
          checked={rowData[dataKey] == true ? 'check' : ''}
        />
      )}
    </Cell>
  )
}

export const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
  return (
    <Cell {...props} style={{ padding: '6px 0' }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick && onClick(rowData.id)
        }}
      >
        {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
      </Button>
    </Cell>
  )
}
