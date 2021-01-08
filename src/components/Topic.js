import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import Paper from 'material-ui/Paper'
import Card from 'material-ui/Card'
import CardText from 'material-ui/Card/CardText'
import CardActions from 'material-ui/Card/CardActions'
import Typography from '@material-ui/core/Typography'

const Topic = (props) => {
  const topic = props.topic.data()
  const title = props.topic.id

  console.log(props.topic.id)

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      marginLeft: 16,
      width: 40,
    },
    input: {
      flex: 1,
    },
    icon: {
      marginRight: 6,
    },
  }

  return (
    <Paper zDepth={1} elevation={13}>
      <Card>
        <CardText>
          <div style={styles.row}>
            <Checkbox
              style={styles.checkbox}
              //   onCheck={this.onPressCheck}
              //   checked={finished}
            />
            <TextField
              id={title}
              style={styles.input}
              underlineShow={false}
              hintText={title ? undefined : 'What needs to be done?'}
              //   onChange={this.onTextChange}
              value={title || ''}
            />
            <Typography color="textSecondary">
              {topic.description}
              <TextField
                id={topic.description}
                // style={styles.input}
                underlineShow={false}
                hintText={topic.description ? undefined : 'What needs to be done?'}
                //   onChange={this.onTextChange}
                value={topic.description || ''}
              />
            </Typography>
            <FlatButton size="small" onClick="https://liquiddota.com">
              Learn More
            </FlatButton>
            <FlatButton
              style={styles.icon}
              icon={<DeleteIcon />}
              secondary
              //   onClick={this.onPressDelete}
            />
          </div>
          <Divider />
        </CardText>
        <CardActions></CardActions>
      </Card>
    </Paper>
  )

  // <p>
  //   <b>{title}</b>: {topic.description}
  // </p>
}

export default Topic
